import os
import smtplib
from email.message import EmailMessage
from html import escape

from dotenv import load_dotenv

load_dotenv()


def send_inquiry_notification(inquiry):
    email_host = os.getenv("EMAIL_HOST")
    email_port = int(os.getenv("EMAIL_PORT", "465"))
    email_username = os.getenv("EMAIL_USERNAME")
    email_password = os.getenv("EMAIL_PASSWORD")
    email_from = os.getenv("EMAIL_FROM")
    email_to = os.getenv("EMAIL_TO")

    if not all([
        email_host,
        email_username,
        email_password,
        email_from,
        email_to,
    ]):
        raise RuntimeError("Email configuration is incomplete")

    # ---------------------------------------------------------
    # Prepare safe values for HTML
    # ---------------------------------------------------------

    reference_id = escape(str(inquiry.reference_id))
    full_name = escape(str(inquiry.full_name))
    email = escape(str(inquiry.email))
    phone = escape(str(inquiry.phone or "Not provided"))

    company_name = escape(str(inquiry.company_name))
    website_url = escape(str(inquiry.website_url or "Not provided"))
    industry = escape(
        str(inquiry.custom_industry or inquiry.industry)
    )

    services = inquiry.services or []
    services_html = "".join(
        f"""
        <span style="
            display:inline-block;
            margin:4px 6px 4px 0;
            padding:7px 10px;
            background:#f5eee8;
            border:1px solid #ddd0c7;
            color:#29231f;
            font-size:12px;
            font-weight:600;
        ">
            {escape(str(service))}
        </span>
        """
        for service in services
    )

    services_text = ", ".join(str(service) for service in services)

    timeline = escape(str(inquiry.timeline))
    budget = escape(str(inquiry.budget))
    contact_preference = escape(
        str(inquiry.contact_preference)
    )
    preferred_time = escape(
        str(inquiry.preferred_time or "Not provided")
    )

    business_description = escape(
        str(inquiry.business_description)
    ).replace("\n", "<br>")

    project_details = escape(
        str(inquiry.project_details)
    ).replace("\n", "<br>")

    # ---------------------------------------------------------
    # Email
    # ---------------------------------------------------------

    message = EmailMessage()

    message["Subject"] = (
        f"New Project Inquiry — {inquiry.reference_id}"
    )

    message["From"] = email_from
    message["To"] = email_to

    # ---------------------------------------------------------
    # Plain-text fallback
    # ---------------------------------------------------------

    message.set_content(
        f"""
SYNRA STUDIOS
New Project Inquiry

A new project inquiry has been submitted through the Synra Studios website.

REFERENCE
---------
{inquiry.reference_id}

CLIENT
------
Name: {inquiry.full_name}
Email: {inquiry.email}
Phone: {inquiry.phone or "Not provided"}

BUSINESS
--------
Company: {inquiry.company_name}
Website: {inquiry.website_url or "Not provided"}
Industry: {inquiry.custom_industry or inquiry.industry}

SERVICES REQUESTED
------------------
{services_text}

PROJECT
-------
Timeline: {inquiry.timeline}
Budget: {inquiry.budget}
Contact Preference: {inquiry.contact_preference}
Preferred Time: {inquiry.preferred_time or "Not provided"}

BUSINESS DESCRIPTION
--------------------
{inquiry.business_description}

PROJECT DETAILS
---------------
{inquiry.project_details}

This inquiry has also been saved in the Synra Studios admin dashboard.

— Synra Studios
Synergy. Strategy. Results.
"""
    )

    # ---------------------------------------------------------
    # HTML email
    # ---------------------------------------------------------

    html_content = f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Project Inquiry</title>
</head>

<body style="
    margin:0;
    padding:0;
    background:#f3eee9;
    font-family:Arial, Helvetica, sans-serif;
    color:#29231f;
">

    <div style="
        width:100%;
        padding:40px 15px;
        box-sizing:border-box;
    ">

        <div style="
            max-width:680px;
            margin:0 auto;
            background:#ffffff;
            border:1px solid #ddd0c7;
        ">

            <!-- Header -->

            <div style="
                padding:32px 35px;
                background:#29231f;
                color:#ffffff;
            ">

                <div style="
                    font-size:13px;
                    font-weight:bold;
                    letter-spacing:3px;
                    margin-bottom:14px;
                ">
                    SYNRA STUDIOS
                </div>

                <div style="
                    font-size:28px;
                    line-height:1.2;
                    font-weight:500;
                ">
                    New Project Inquiry
                </div>

                <div style="
                    margin-top:10px;
                    color:#d8cec7;
                    font-size:13px;
                ">
                    A new inquiry has been submitted through your website.
                </div>

            </div>


            <!-- Reference -->

            <div style="
                padding:24px 35px;
                background:#f5eee8;
                border-bottom:1px solid #ddd0c7;
            ">

                <div style="
                    color:#8d4f3f;
                    font-size:10px;
                    font-weight:bold;
                    letter-spacing:2px;
                    text-transform:uppercase;
                    margin-bottom:7px;
                ">
                    Reference ID
                </div>

                <div style="
                    font-size:20px;
                    font-weight:bold;
                    letter-spacing:1px;
                ">
                    {reference_id}
                </div>

            </div>


            <!-- Main content -->

            <div style="padding:32px 35px;">

                <!-- Client -->

                <div style="margin-bottom:32px;">

                    <div style="
                        color:#8d4f3f;
                        font-size:10px;
                        font-weight:bold;
                        letter-spacing:2px;
                        text-transform:uppercase;
                        margin-bottom:15px;
                    ">
                        Client
                    </div>

                    <div style="
                        font-size:20px;
                        font-weight:bold;
                        margin-bottom:8px;
                    ">
                        {full_name}
                    </div>

                    <div style="
                        font-size:13px;
                        line-height:1.8;
                        color:#625a54;
                    ">
                        {email}<br>
                        {phone}
                    </div>

                </div>


                <!-- Business -->

                <div style="
                    margin-bottom:32px;
                    padding-top:25px;
                    border-top:1px solid #e4ddd7;
                ">

                    <div style="
                        color:#8d4f3f;
                        font-size:10px;
                        font-weight:bold;
                        letter-spacing:2px;
                        text-transform:uppercase;
                        margin-bottom:15px;
                    ">
                        Business
                    </div>

                    <table style="
                        width:100%;
                        border-collapse:collapse;
                        font-size:13px;
                    ">

                        <tr>
                            <td style="
                                padding:7px 0;
                                width:35%;
                                color:#817870;
                            ">
                                Company
                            </td>

                            <td style="
                                padding:7px 0;
                                font-weight:600;
                            ">
                                {company_name}
                            </td>
                        </tr>

                        <tr>
                            <td style="
                                padding:7px 0;
                                color:#817870;
                            ">
                                Website
                            </td>

                            <td style="padding:7px 0;">
                                {website_url}
                            </td>
                        </tr>

                        <tr>
                            <td style="
                                padding:7px 0;
                                color:#817870;
                            ">
                                Industry
                            </td>

                            <td style="
                                padding:7px 0;
                                font-weight:600;
                            ">
                                {industry}
                            </td>
                        </tr>

                    </table>

                </div>


                <!-- Services -->

                <div style="
                    margin-bottom:32px;
                    padding-top:25px;
                    border-top:1px solid #e4ddd7;
                ">

                    <div style="
                        color:#8d4f3f;
                        font-size:10px;
                        font-weight:bold;
                        letter-spacing:2px;
                        text-transform:uppercase;
                        margin-bottom:12px;
                    ">
                        Services Requested
                    </div>

                    <div>
                        {services_html}
                    </div>

                </div>


                <!-- Project -->

                <div style="
                    margin-bottom:32px;
                    padding-top:25px;
                    border-top:1px solid #e4ddd7;
                ">

                    <div style="
                        color:#8d4f3f;
                        font-size:10px;
                        font-weight:bold;
                        letter-spacing:2px;
                        text-transform:uppercase;
                        margin-bottom:15px;
                    ">
                        Project
                    </div>

                    <table style="
                        width:100%;
                        border-collapse:collapse;
                        font-size:13px;
                    ">

                        <tr>
                            <td style="
                                padding:7px 0;
                                width:35%;
                                color:#817870;
                            ">
                                Timeline
                            </td>

                            <td style="
                                padding:7px 0;
                                font-weight:600;
                            ">
                                {timeline}
                            </td>
                        </tr>

                        <tr>
                            <td style="
                                padding:7px 0;
                                color:#817870;
                            ">
                                Budget
                            </td>

                            <td style="
                                padding:7px 0;
                                font-weight:600;
                            ">
                                {budget}
                            </td>
                        </tr>

                        <tr>
                            <td style="
                                padding:7px 0;
                                color:#817870;
                            ">
                                Contact Preference
                            </td>

                            <td style="padding:7px 0;">
                                {contact_preference}
                            </td>
                        </tr>

                        <tr>
                            <td style="
                                padding:7px 0;
                                color:#817870;
                            ">
                                Preferred Time
                            </td>

                            <td style="padding:7px 0;">
                                {preferred_time}
                            </td>
                        </tr>

                    </table>

                </div>


                <!-- Business Description -->

                <div style="
                    margin-bottom:32px;
                    padding-top:25px;
                    border-top:1px solid #e4ddd7;
                ">

                    <div style="
                        color:#8d4f3f;
                        font-size:10px;
                        font-weight:bold;
                        letter-spacing:2px;
                        text-transform:uppercase;
                        margin-bottom:12px;
                    ">
                        Business Description
                    </div>

                    <div style="
                        font-size:13px;
                        line-height:1.8;
                        color:#4f4741;
                    ">
                        {business_description}
                    </div>

                </div>


                <!-- Project Details -->

                <div style="
                    padding-top:25px;
                    border-top:1px solid #e4ddd7;
                ">

                    <div style="
                        color:#8d4f3f;
                        font-size:10px;
                        font-weight:bold;
                        letter-spacing:2px;
                        text-transform:uppercase;
                        margin-bottom:12px;
                    ">
                        Project Details
                    </div>

                    <div style="
                        font-size:13px;
                        line-height:1.8;
                        color:#4f4741;
                    ">
                        {project_details}
                    </div>

                </div>

            </div>


            <!-- Footer -->

            <div style="
                padding:25px 35px;
                background:#29231f;
                color:#d8cec7;
                font-size:11px;
                line-height:1.7;
            ">

                <div style="
                    color:#ffffff;
                    font-weight:bold;
                    letter-spacing:2px;
                    margin-bottom:8px;
                ">
                    SYNRA STUDIOS
                </div>

                This inquiry has also been saved in the Synra Studios
                admin dashboard.

                <div style="
                    margin-top:12px;
                    color:#a99e96;
                ">
                    Synergy. Strategy. Results.
                </div>

            </div>

        </div>

    </div>

</body>
</html>
"""

    message.add_alternative(
        html_content,
        subtype="html"
    )

    # ---------------------------------------------------------
    # Send email
    # ---------------------------------------------------------

    with smtplib.SMTP_SSL(email_host, email_port) as smtp:
        smtp.login(email_username, email_password)
        smtp.send_message(message)