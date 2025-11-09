import firebase_admin
from firebase_admin import credentials, auth
import os
from dotenv import load_dotenv

load_dotenv()

# Initialize Firebase Admin SDK
cred = credentials.Certificate(os.getenv("FIREBASE_CREDENTIALS_PATH"))
firebase_admin.initialize_app(cred)


def verify_google_token(id_token: str):
    """
    Verify Google Sign-In token from frontend.
    Returns user info if valid, error if invalid.
    """
    try:
        # Firebase automatically verifies Google tokens
        decoded_token = auth.verify_id_token(id_token)
        
        # Extract user info
        email = decoded_token.get("email", "")
        
        # Check if it's a UCI email
        if not email.endswith("@uci.edu"):
            return {
                "success": False, 
                "error": "Please use your UCI email address (@uci.edu)"
            }
        
        return {
            "success": True,
            "uid": decoded_token["uid"],
            "email": decoded_token["email"],
            "name": decoded_token.get("name"),
            "picture": decoded_token.get("picture"),
            "email_verified": decoded_token.get("email_verified", False)
        }
    except auth.InvalidIdTokenError:
        return {"success": False, "error": "Invalid token"}
    except auth.ExpiredIdTokenError:
        return {"success": False, "error": "Token expired"}
    except Exception as e:
        return {"success": False, "error": f"Authentication failed: {str(e)}"}


def get_user_by_uid(uid: str):
    """Get user information by UID"""
    try:
        user = auth.get_user(uid)
        return {
            "success": True,
            "uid": user.uid,
            "email": user.email,
            "name": user.display_name,
            "picture": user.photo_url,
            "email_verified": user.email_verified
        }
    except Exception as e:
        return {"success": False, "error": str(e)}
    