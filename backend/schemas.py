from typing import List, Literal, Optional

from pydantic import BaseModel, EmailStr, Field, field_validator


# =========================================================
# Project Inquiry
# =========================================================

class ProjectInquiryCreate(BaseModel):

    fullName: str = Field(
        ...,
        min_length=2,
        max_length=100
    )

    email: EmailStr

    phone: Optional[str] = Field(
        default=None,
        max_length=30
    )

    companyName: str = Field(
        ...,
        min_length=2,
        max_length=150
    )

    websiteUrl: Optional[str] = Field(
        default=None,
        max_length=300
    )

    businessDescription: str = Field(
        ...,
        min_length=5,
        max_length=5000
    )

    industry: str = Field(
        ...,
        min_length=2,
        max_length=100
    )

    customIndustry: Optional[str] = Field(
        default=None,
        max_length=100
    )

    services: List[str] = Field(
        ...,
        min_length=1,
        max_length=20
    )

    projectDetails: str = Field(
        ...,
        min_length=5,
        max_length=10000
    )

    timeline: str = Field(
        ...,
        min_length=1,
        max_length=100
    )

    budget: str = Field(
        ...,
        min_length=1,
        max_length=100
    )

    contactPreference: str = Field(
        ...,
        min_length=1,
        max_length=50
    )

    preferredTime: Optional[str] = Field(
        default=None,
        max_length=100
    )

    # =====================================================
    # Validators
    # =====================================================

    @field_validator(
        "fullName",
        "companyName",
        "businessDescription",
        "industry",
        "projectDetails",
        "timeline",
        "budget",
        "contactPreference",
        mode="before"
    )
    @classmethod
    def validate_required_text(cls, value):
        if value is None:
            raise ValueError("This field is required")

        value = str(value).strip()

        if not value:
            raise ValueError("This field cannot be empty")

        return value

    @field_validator(
        "phone",
        "websiteUrl",
        "customIndustry",
        "preferredTime",
        mode="before"
    )
    @classmethod
    def clean_optional_text(cls, value):
        if value is None:
            return None

        value = str(value).strip()

        return value if value else None

    @field_validator("services")
    @classmethod
    def validate_services(cls, value):
        if not value:
            raise ValueError(
                "At least one service must be selected"
            )

        cleaned_services = []

        for service in value:
            if not isinstance(service, str):
                raise ValueError(
                    "Each service must be a string"
                )

            service = service.strip()

            if not service:
                raise ValueError(
                    "Service names cannot be empty"
                )

            if len(service) > 100:
                raise ValueError(
                    "Service name is too long"
                )

            cleaned_services.append(service)

        return cleaned_services


# =========================================================
# Inquiry Status
# =========================================================

class InquiryStatusUpdate(BaseModel):

    status: Literal[
        "new",
        "contacted",
        "discussion",
        "quoted",
        "converted",
        "closed",
    ]


# =========================================================
# Admin Login
# =========================================================

class AdminLogin(BaseModel):

    email: EmailStr

    password: str = Field(
        ...,
        min_length=1,
        max_length=200
    )


# =========================================================
# Authentication Token
# =========================================================

class TokenResponse(BaseModel):

    access_token: str

    token_type: str