from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from src.auth import verify_google_token, get_user_by_uid

app = FastAPI(
    title="UCI Housing Hub Auth API",
    version="1.0.0",
    description="Authentication API for UCI Housing Hub using Google Sign-In"
)

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite default
        "http://localhost:3000",  # React default
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Pydantic models
class GoogleSignInRequest(BaseModel):
    id_token: str


class UserResponse(BaseModel):
    uid: str
    email: str
    name: str | None
    picture: str | None
    email_verified: bool


# Routes
@app.get("/")
def root():
    """Root endpoint - API health check"""
    return {
        "message": "UCI Housing Hub Auth API is running! 🔥",
        "version": "1.0.0",
        "endpoints": {
            "docs": "/docs",
            "google_signin": "/api/auth/google",
            "current_user": "/api/auth/me"
        }
    }


@app.post("/api/auth/google", response_model=UserResponse)
def google_signin(request: GoogleSignInRequest):
    """
    Verify Google Sign-In token and authenticate user.
    
    The frontend sends the ID token received from Google Sign-In,
    and this endpoint verifies it and returns user information.
    """
    result = verify_google_token(request.id_token)
    
    if result["success"]:
        return UserResponse(
            uid=result["uid"],
            email=result["email"],
            name=result.get("name"),
            picture=result.get("picture"),
            email_verified=result.get("email_verified", False)
        )
    else:
        raise HTTPException(
            status_code=401,
            detail=result["error"]
        )


@app.get("/api/auth/me", response_model=UserResponse)
def get_current_user(authorization: str = Header(None)):
    """
    Get current authenticated user information.
    
    Requires Authorization header with Bearer token.
    Example: Authorization: Bearer <id_token>
    """
    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Missing authorization header"
        )
    
    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401,
            detail="Invalid authorization header format. Use: Bearer <token>"
        )
    
    # Extract token
    token = authorization.split("Bearer ")[1]
    
    # Verify token
    result = verify_google_token(token)
    
    if result["success"]:
        return UserResponse(
            uid=result["uid"],
            email=result["email"],
            name=result.get("name"),
            picture=result.get("picture"),
            email_verified=result.get("email_verified", False)
        )
    else:
        raise HTTPException(
            status_code=401,
            detail=result["error"]
        )


@app.get("/api/auth/protected")
def protected_route(authorization: str = Header(None)):
    """
    Example of a protected route that requires authentication.
    """
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401,
            detail="Authentication required"
        )
    
    token = authorization.split("Bearer ")[1]
    result = verify_google_token(token)
    
    if result["success"]:
        return {
            "message": f"Hello {result['name'] or result['email']}! 🎉",
            "info": "This is a protected route - you're authenticated!",
            "user": result
        }
    else:
        raise HTTPException(
            status_code=401,
            detail=result["error"]
        )


@app.post("/api/auth/signout")
def signout():
    """
    Sign out endpoint (client should delete the token).
    Firebase tokens are stateless, so we just return success.
    The client should remove the token from storage.
    """
    return {
        "message": "Signed out successfully",
        "note": "Please delete the token from client storage"
    }