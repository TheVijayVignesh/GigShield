from sqlalchemy import Column, Integer, String
from database import Base


class DeliveryPartner(Base):
    __tablename__ = "delivery_partners"

    partner_id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    status = Column(String, nullable=False)
    avg_weekly_earnings_inr = Column(Integer)
    ph_no = Column(String, nullable=False)
    primary_zone = Column(String)
