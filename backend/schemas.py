from pydantic import BaseModel


class PartnerOut(BaseModel):
    partner_id: str
    name: str
    status: str
    avg_weekly_earnings_inr: int
    ph_no: str
    primary_zone: str

    model_config = {"from_attributes": True}


class LoginRequest(BaseModel):
    partner_id: str


class OTPVerifyRequest(BaseModel):
    partner_id: str
    otp: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
