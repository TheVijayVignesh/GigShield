from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "sqlite:///./gigshield.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def seed_database():
    """Create all tables and insert seed data if empty."""
    from models import DeliveryPartner

    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        count = db.query(DeliveryPartner).count()
        if count == 0:
            partners = [
                DeliveryPartner(
                    partner_id="SWG-84729",
                    name="Vijay Vignesh",
                    status="active_gold",
                    avg_weekly_earnings_inr=4500,
                    ph_no="9345601197",
                    primary_zone="Chennai_South",
                ),
                DeliveryPartner(
                    partner_id="SWG-11032",
                    name="Riya Sharma",
                    status="active_silver",
                    avg_weekly_earnings_inr=3100,
                    ph_no="9812345678",
                    primary_zone="Delhi_West",
                ),
                DeliveryPartner(
                    partner_id="SWG-29847",
                    name="Arjun Nair",
                    status="active_gold",
                    avg_weekly_earnings_inr=5200,
                    ph_no="9087654321",
                    primary_zone="Bangalore_East",
                ),
                DeliveryPartner(
                    partner_id="SWG-56103",
                    name="Priya Patel",
                    status="active_bronze",
                    avg_weekly_earnings_inr=2200,
                    ph_no="9765432109",
                    primary_zone="Mumbai_North",
                ),
                DeliveryPartner(
                    partner_id="SWG-73901",
                    name="Mohammed Farhan",
                    status="active_silver",
                    avg_weekly_earnings_inr=3800,
                    ph_no="9654321087",
                    primary_zone="Hyderabad_Central",
                ),
            ]
            db.add_all(partners)
            db.commit()
    finally:
        db.close()
