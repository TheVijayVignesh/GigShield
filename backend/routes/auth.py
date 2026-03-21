import random
from fastapi import APIRouter, HTTPException

from schemas import LoginRequest, OTPVerifyRequest, TokenResponse
from models import DeliveryPartner
from database import SessionLocal

router = APIRouter()

OTP_STORE = {}


@router.post("/login")
def login(request: LoginRequest):
    db = SessionLocal()
    try:
        partner = db.query(DeliveryPartner).filter(
            DeliveryPartner.partner_id == request.partner_id
        ).first()

        if partner is None:
            raise HTTPException(status_code=404, detail="Partner ID not found")

        otp = str(random.randint(100000, 999999))
        OTP_STORE[request.partner_id] = otp

        print(f"[MOCK OTP] {request.partner_id}: {otp}")

        phone_hint = partner.ph_no[-4:] if len(partner.ph_no) >= 4 else partner.ph_no

        return {
            "message": "OTP sent to registered number",
            "phone_hint": phone_hint,
        }
    finally:
        db.close()


@router.post("/verify")
def verify(request: OTPVerifyRequest):
    stored_otp = OTP_STORE.get(request.partner_id)

    if stored_otp is None:
        raise HTTPException(status_code=401, detail="Invalid OTP")

    if str(request.otp) != stored_otp:
        raise HTTPException(status_code=401, detail="Invalid OTP")

    del OTP_STORE[request.partner_id]

    access_token = f"mock-jwt-{request.partner_id}"

    return TokenResponse(access_token=access_token, token_type="bearer")
