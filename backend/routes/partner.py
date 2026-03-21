from fastapi import APIRouter, HTTPException, Header

from schemas import PartnerOut
from models import DeliveryPartner
from database import SessionLocal

router = APIRouter()


@router.get("/me", response_model=PartnerOut)
def get_partner(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")

    token = authorization[7:]

    if not token.startswith("mock-jwt-"):
        raise HTTPException(status_code=401, detail="Invalid token format")

    partner_id = token[len("mock-jwt-"):]

    db = SessionLocal()
    try:
        partner = db.query(DeliveryPartner).filter(
            DeliveryPartner.partner_id == partner_id
        ).first()

        if partner is None:
            raise HTTPException(status_code=404, detail="Partner not found")

        return partner
    finally:
        db.close()
