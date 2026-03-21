from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.auth import router as auth_router
from routes.partner import router as partner_router
from database import seed_database

app = FastAPI(title="GigShield Mock Swiggy API")

# CORS middleware - allow all origins for local dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():
    seed_database()


# Mount routers
app.include_router(auth_router, prefix="/auth")
app.include_router(partner_router, prefix="/partner")


@app.get("/")
def root():
    return {"service": "GigShield Mock Swiggy API", "status": "running"}
