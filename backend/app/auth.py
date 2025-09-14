from fastapi import HTTPException, Depends, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials

security = HTTPBasic()
USER = "admin"
PASSWORD = "password"

def authenticate(credentials: HTTPBasicCredentials = Depends(security)):
    if credentials.username != USER or credentials.password != PASSWORD:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    return True
