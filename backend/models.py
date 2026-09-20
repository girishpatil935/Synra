from datetime import datetime, timezone

from sqlalchemy import Column, Integer, String, Text, DateTime, JSON, Boolean

from backend.database import Base

# =========================================================
# Project Inquiry Model
# =========================================================
# This Python class represents the "project_inquiries"
# table in our PostgreSQL database.
#
# One customer submitting the inquiry form = one row
# in this table.
# =========================================================

class ProjectInquiry(Base):

    # Name of the PostgreSQL table
    __tablename__ = "project_inquiries"


    # -----------------------------------------------------
    # Primary key
    # -----------------------------------------------------
    # Automatically identifies each inquiry.
    #
    # Example:
    # 1
    # 2
    # 3
    # -----------------------------------------------------
    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    # -----------------------------------------------------
    # Unique reference number for the customer
    #
    # Example:
    # SYN-A82K91
    # -----------------------------------------------------
    reference_id = Column(
        String(20),
        unique=True,
        nullable=False,
        index=True
    )


    # -----------------------------------------------------
    # Customer information
    # -----------------------------------------------------

    full_name = Column(
        String(100),
        nullable=False
    )

    email = Column(
        String(150),
        nullable=False
    )

    phone = Column(
        String(30),
        nullable=True
    )


    # -----------------------------------------------------
    # Company information
    # -----------------------------------------------------

    company_name = Column(
        String(150),
        nullable=False
    )

    website_url = Column(
        String(300),
        nullable=True
    )


    # -----------------------------------------------------
    # Business information
    # -----------------------------------------------------

    business_description = Column(
        Text,
        nullable=False
    )

    industry = Column(
        String(100),
        nullable=False
    )

    # Used when customer selects "Other" for industry
    custom_industry = Column(
        String(100),
        nullable=True
    )


    # -----------------------------------------------------
    # Services selected by the customer
    #
    # Since customers can select multiple services, we store
    # them as a JSON array.
    #
    # Example:
    # [
    #     "Web Development",
    #     "UI/UX Design",
    #     "SEO"
    # ]
    # -----------------------------------------------------

    services = Column(
        JSON,
        nullable=False
    )


    # -----------------------------------------------------
    # Project requirements
    # -----------------------------------------------------

    project_details = Column(
        Text,
        nullable=False
    )


    # -----------------------------------------------------
    # Project planning information
    # -----------------------------------------------------

    timeline = Column(
        String(100),
        nullable=False
    )

    budget = Column(
        String(100),
        nullable=False
    )


    # -----------------------------------------------------
    # Preferred communication method
    # -----------------------------------------------------

    contact_preference = Column(
        String(50),
        nullable=False
    )

    preferred_time = Column(
        String(100),
        nullable=True
    )


    # -----------------------------------------------------
    # Inquiry status
    #
    # Initially every inquiry will be "new".
    #
    # Later we can change it to:
    #
    # new
    # contacted
    # qualified
    # proposal_sent
    # won
    # lost
    # -----------------------------------------------------

    status = Column(
        String(30),
        nullable=False,
        default="new"
    )


    # -----------------------------------------------------
    # Timestamps
    # -----------------------------------------------------

    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc)
    )

    updated_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc)
    )
    
    




class AdminUser(Base):
    __tablename__ = "admin_users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100), nullable=False)

    email = Column(
        String(150),
        unique=True,
        nullable=False,
        index=True
    )

    password_hash = Column(
        String(255),
        nullable=False
    )

    is_active = Column(
        Boolean,
        nullable=False,
        default=True
    )

    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc)
    )

    updated_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc)
    )