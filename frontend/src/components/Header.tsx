import { Home, Users, BookOpen, User } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { SignInDialog } from "./SignInDialog";
import { auth, signOutUser, getUserProfile } from "../lib/firebase";

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onProfileClick?: () => void;
}

export function Header({ activeTab, onTabChange, onProfileClick }: HeaderProps) {
  const [signInOpen, setSignInOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Listen to Firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleSignInSuccess = async () => {
    setSignInOpen(false);
    
    // Check if user already has a profile
    const user = auth.currentUser;
    if (user) {
      const profileResult = await getUserProfile(user.uid);
      
      if (profileResult.success) {
        console.log("✅ Existing user signed in, profile exists");
      } else {
        console.log("🆕 New user signed in, showing profile form");
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      setUser(null);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Home className="h-6 w-6" style={{ color: 'rgb(17, 63, 103)' }} />
              <span className="text-xl font-bold">ZotHomes</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => onTabChange('housing')}
                className={`flex items-center gap-2 transition-colors ${
                  activeTab === 'housing' ? 'text-gray-600 hover:text-gray-900' : 'text-gray-600 hover:text-gray-900'
                }`}
                style={activeTab === 'housing' ? { color: 'rgb(17, 63, 103)' } : {}}
              >
                <Home className="h-4 w-4" />
                Housing
              </button>
              <button
                onClick={() => onTabChange('roommates')}
                className={`flex items-center gap-2 transition-colors ${
                  activeTab === 'roommates' ? 'text-gray-600 hover:text-gray-900' : 'text-gray-600 hover:text-gray-900'
                }`}
                style={activeTab === 'roommates' ? { color: 'rgb(17, 63, 103)' } : {}}
              >
                <Users className="h-4 w-4" />
                Find Roommates
              </button>
              <button
                onClick={() => onTabChange('guide')}
                className={`flex items-center gap-2 transition-colors ${
                  activeTab === 'guide' ? 'text-gray-600 hover:text-gray-900' : 'text-gray-600 hover:text-gray-900'
                }`}
                style={activeTab === 'guide' ? { color: 'rgb(17, 63, 103)' } : {}}
              >
                <BookOpen className="h-4 w-4" />
                UCI Housing Assistant Chatbot
              </button>
            </nav>

            <div className="flex items-center gap-3">
              {!user ? (
                <Button variant="ghost" size="sm" onClick={() => setSignInOpen(true)}>
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      console.log("🖱️ My Profile clicked!");
                      onProfileClick?.();
                    }}
                  >
                    <User className="h-4 w-4 mr-2" />
                    My Profile
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <SignInDialog
        open={signInOpen}
        onClose={() => setSignInOpen(false)}
        onSignInSuccess={handleSignInSuccess}
      />
    </>
  );
}
