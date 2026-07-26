import platform
import socket

from fastapi import APIRouter

from app.config import APP_NAME, APP_VERSION, ENVIRONMENT

router = APIRouter(prefix="/api")


@router.get("/health")
def health():
    return {
        "status": "UP"
    }


@router.get("/info")
def info():
    return {
        "application": APP_NAME,
        "version": APP_VERSION,
        "environment": ENVIRONMENT
    }

@router.get("/system")
def system():
    return {
        "hostname": socket.gethostname(),
        "os": platform.system(),
        "python_version": platform.python_version()
    }