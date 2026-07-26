from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import APP_NAME, APP_VERSION
from app.routes import router

app = FastAPI(
    title=APP_NAME,
    version=APP_VERSION,
)

# Allow frontend during local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8081",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)