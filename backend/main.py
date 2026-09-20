from uuid import uuid4
import os

from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from backend.database import engine, Base
from backend.dependencies import get_db
from backend.email_service import send_inquiry_notification
from backend.models import ProjectInquiry, AdminUser
from backend.schemas import (
    ProjectInquiryCreate,
    InquiryStatusUpdate,
    AdminLogin,
    TokenResponse,
)
from backend.auth import (
    verify_password,
    create_access_token,
    get_current_admin,
)


# =========================================================
# Create the FastAPI application
# =========================================================

app = FastAPI(
    title="Synra Backend"
)


# =========================================================
# Trusted Host Configuration
# =========================================================

allowed_hosts = os.getenv(
    "ALLOWED_HOSTS",
    "localhost,127.0.0.1"
).split(",")

allowed_hosts = [
    host.strip()
    for host in allowed_hosts
    if host.strip()
]

app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=allowed_hosts,
)


# =========================================================
# Security Headers
# =========================================================

@app.middleware("http")
async def add_security_headers(
    request: Request,
    call_next
):
    response = await call_next(request)

    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = (
        "camera=(), microphone=(), geolocation=()"
    )

    return response


# =========================================================
# Create database tables
# =========================================================

Base.metadata.create_all(bind=engine)


# =========================================================
# CORS Configuration
# =========================================================

frontend_url = os.getenv(
    "FRONTEND_URL",
    "http://localhost:3000"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        frontend_url,
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# Home / Health Check
# =========================================================

@app.get("/")
def home():
    return {
        "message": "Synra Backend is running!"
    }


# =========================================================
# CREATE PROJECT INQUIRY
# =========================================================

@app.post("/api/inquiries")
def create_inquiry(
    inquiry: ProjectInquiryCreate,
    db: Session = Depends(get_db)
):
    reference_id = f"SYN-{uuid4().hex[:6].upper()}"

    new_inquiry = ProjectInquiry(
        reference_id=reference_id,

        # Customer information
        full_name=inquiry.fullName,
        email=inquiry.email,
        phone=inquiry.phone,

        # Company information
        company_name=inquiry.companyName,
        website_url=inquiry.websiteUrl,

        # Business information
        business_description=inquiry.businessDescription,
        industry=inquiry.industry,
        custom_industry=inquiry.customIndustry,

        # Services
        services=inquiry.services,

        # Project information
        project_details=inquiry.projectDetails,
        timeline=inquiry.timeline,
        budget=inquiry.budget,

        # Contact information
        contact_preference=inquiry.contactPreference,
        preferred_time=inquiry.preferredTime,

        # Initial status
        status="new",
    )

    # -----------------------------------------------------
    # Save inquiry to PostgreSQL
    # -----------------------------------------------------

    try:
        db.add(new_inquiry)
        db.commit()
        db.refresh(new_inquiry)

    except SQLAlchemyError as error:
        db.rollback()

        print(
            f"Database error while creating inquiry: {error}"
        )

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to save your inquiry. Please try again."
        )

    # -----------------------------------------------------
    # Send email notification
    # -----------------------------------------------------

    try:
        send_inquiry_notification(new_inquiry)

    except Exception as error:
        print(
            f"Email notification failed: {error}"
        )

    # -----------------------------------------------------
    # Response
    # -----------------------------------------------------

    return {
        "message": "Project inquiry submitted successfully",
        "reference_id": new_inquiry.reference_id,
    }


# =========================================================
# ADMIN LOGIN
# =========================================================

@app.post(
    "/api/admin/login",
    response_model=TokenResponse
)
def admin_login(
    login_data: AdminLogin,
    db: Session = Depends(get_db)
):
    try:
        admin = (
            db.query(AdminUser)
            .filter(
                AdminUser.email == login_data.email.lower()
            )
            .first()
        )

    except SQLAlchemyError as error:
        db.rollback()

        print(
            f"Database error during admin login: {error}"
        )

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to process login request."
        )

    if not admin:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    if not admin.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin account is disabled"
        )

    if not verify_password(
        login_data.password,
        admin.password_hash
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    access_token = create_access_token(
        user_id=admin.id,
        email=admin.email
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


# =========================================================
# CURRENT ADMIN
# =========================================================

@app.get("/api/admin/me")
def get_current_admin_info(
    current_admin=Depends(get_current_admin)
):
    return {
        "id": current_admin.id,
        "name": current_admin.name,
        "email": current_admin.email,
        "is_active": current_admin.is_active,
    }


# =========================================================
# GET ALL PROJECT INQUIRIES
# =========================================================

@app.get("/api/inquiries")
def get_inquiries(
    db: Session = Depends(get_db),
    current_admin=Depends(get_current_admin)
):
    try:
        inquiries = (
            db.query(ProjectInquiry)
            .order_by(ProjectInquiry.id.desc())
            .all()
        )

    except SQLAlchemyError as error:
        db.rollback()

        print(
            f"Database error while fetching inquiries: {error}"
        )

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to load inquiries."
        )

    return [
        {
            "id": inquiry.id,
            "reference_id": inquiry.reference_id,
            "full_name": inquiry.full_name,
            "email": inquiry.email,
            "phone": inquiry.phone,
            "company_name": inquiry.company_name,
            "website_url": inquiry.website_url,
            "business_description": inquiry.business_description,
            "industry": inquiry.industry,
            "custom_industry": inquiry.custom_industry,
            "services": inquiry.services,
            "project_details": inquiry.project_details,
            "timeline": inquiry.timeline,
            "budget": inquiry.budget,
            "contact_preference": inquiry.contact_preference,
            "preferred_time": inquiry.preferred_time,
            "status": inquiry.status,
            "created_at": inquiry.created_at,
            "updated_at": inquiry.updated_at,
        }
        for inquiry in inquiries
    ]


# =========================================================
# UPDATE INQUIRY STATUS
# =========================================================

@app.patch("/api/inquiries/{inquiry_id}/status")
def update_inquiry_status(
    inquiry_id: int,
    status_data: InquiryStatusUpdate,
    db: Session = Depends(get_db),
    current_admin=Depends(get_current_admin)
):
    try:
        inquiry = (
            db.query(ProjectInquiry)
            .filter(
                ProjectInquiry.id == inquiry_id
            )
            .first()
        )

        if not inquiry:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Inquiry not found"
            )

        inquiry.status = status_data.status

        db.commit()
        db.refresh(inquiry)

    except HTTPException:
        raise

    except SQLAlchemyError as error:
        db.rollback()

        print(
            f"Database error while updating inquiry: {error}"
        )

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to update inquiry status."
        )

    return {
        "message": "Inquiry status updated successfully",
        "id": inquiry.id,
        "reference_id": inquiry.reference_id,
        "status": inquiry.status,
    }