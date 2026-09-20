import getpass

from backend.database import SessionLocal
from backend.models import AdminUser
from backend.auth import hash_password


def create_admin():
    print("\n=== Synra Admin Creation ===\n")

    name = input("Admin name: ").strip()
    email = input("Admin email: ").strip().lower()

    password = getpass.getpass("Password: ")
    confirm_password = getpass.getpass("Confirm password: ")

    if password != confirm_password:
        print("\n❌ Passwords do not match.")
        return

    if len(password) < 8:
        print("\n❌ Password must be at least 8 characters.")
        return

    db = SessionLocal()

    try:
        existing_admin = (
            db.query(AdminUser)
            .filter(AdminUser.email == email)
            .first()
        )

        if existing_admin:
            print("\n❌ An admin with this email already exists.")
            return

        admin = AdminUser(
            name=name,
            email=email,
            password_hash=hash_password(password),
            is_active=True,
        )

        db.add(admin)
        db.commit()

        print("\n✅ Admin account created successfully!")
        print(f"Email: {email}")

    except Exception as e:
        db.rollback()
        print("\n❌ Failed to create admin.")
        print(e)

    finally:
        db.close()


if __name__ == "__main__":
    create_admin()