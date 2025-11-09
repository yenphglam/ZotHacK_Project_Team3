import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { HousingCard, Housing } from "./components/HousingCard";
import { RoommateCard, Roommate } from "./components/RoommateCard";
import { HousingFilters } from "./components/HousingFilters";
import { RoommateFilters } from "./components/RoommateFilters";
import { HousingGuide } from "./components/HousingGuide";
import { HousingDetail } from "./components/HousingDetail";
import { ProfileForm } from "./components/ProfileForm";
import { Button } from "./components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { useMatchedRoommates } from "./hooks/useMatchedRoommates";
import { auth } from "./lib/firebase";
import { getUserProfile } from "./lib/firebase";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("housing");
  const [selectedHousing, setSelectedHousing] = useState<Housing | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // ADD THESE NEW LINES:
  const [user, setUser] = useState<any>(null);
  const [hasProfile, setHasProfile] = useState(false);
  const [profileFormOpen, setProfileFormOpen] = useState(false);

  // Fetch roommates from Firebase
  const { matches, loading: roommatesLoading, error: roommatesError } = useMatchedRoommates();

  // Check if user is signed in and has a profile
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      
      if (user) {
        // Check if user has a profile
        const profileResult = await getUserProfile(user.uid);
        
        if (profileResult.success) {
          // User HAS a profile - don't show form
          setHasProfile(true);
          setProfileFormOpen(false);
          console.log("✅ User has existing profile, skipping form");
        } else {
          // User DOESN'T have a profile - show form
          setHasProfile(false);
          setProfileFormOpen(true);
          console.log("❌ No profile found, showing form");
        }
      } else {
        setHasProfile(false);
        setProfileFormOpen(false);
      }
    });

    return () => unsubscribe();
}, []);

  // UC Irvine specific housing options
  const mockHousingData: Housing[] = [
    {
      id: "1",
      title: "Campus Village Apartments",
      address: "Campus Dr, Irvine, CA 92617",
      price: 1450,
      bedrooms: 2,
      bathrooms: 2,
      distance: "On Campus",
      available: "September 2025",
      image: "https://images.unsplash.com/photo-1563418536419-3a3ad6ef5efd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBpbnRlcmlvciUyMG1vZGVybnxlbnwxfHx8fDE3NjI1Nzg2NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      amenities: ["WiFi", "Parking", "Pool", "Study Rooms", "Gym Access"],
      type: "apartment"
    },
    {
      id: "2",
      title: "Arroyo Vista Housing",
      address: "Arroyo Dr, Irvine, CA 92617",
      price: 1350,
      bedrooms: 4,
      bathrooms: 2,
      distance: "On Campus",
      available: "August 2025",
      image: "https://images.unsplash.com/photo-1504390747618-f9ea2a96c487?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwZG9ybSUyMHJvb218ZW58MXx8fHwxNzYyNTU0OTI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      amenities: ["Furnished", "WiFi", "Parking", "Utilities Included", "Basketball Court"],
      type: "apartment"
    },
    {
      id: "3",
      title: "Verano Place Apartments",
      address: "Verano Pl, Irvine, CA 92617",
      price: 1550,
      bedrooms: 2,
      bathrooms: 2,
      distance: "0.3 mi from UCI",
      available: "July 2025",
      image: "https://images.unsplash.com/photo-1563418536419-3a3ad6ef5efd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBpbnRlcmlvciUyMG1vZGVybnxlbnwxfHx8fDE3NjI1Nzg2NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      amenities: ["WiFi", "Parking", "Pool", "Gym Access", "Laundry"],
      type: "apartment"
    },
    {
      id: "4",
      title: "University Town Center Condos",
      address: "Campus Dr, Irvine, CA 92612",
      price: 1800,
      bedrooms: 2,
      bathrooms: 2,
      distance: "1.5 mi from UCI",
      available: "September 2025",
      image: "https://images.unsplash.com/photo-1563418536419-3a3ad6ef5efd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBpbnRlcmlvciUyMG1vZGVybnxlbnwxfHx8fDE3NjI1Nzg2NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      amenities: ["WiFi", "Parking", "Pool", "Gym", "Near Shopping"],
      type: "apartment"
    },
    {
      id: "5",
      title: "Turtle Rock Apartments",
      address: "Turtle Rock Dr, Irvine, CA 92612",
      price: 1650,
      bedrooms: 1,
      bathrooms: 1,
      distance: "2.1 mi from UCI",
      available: "August 2025",
      image: "https://images.unsplash.com/photo-1504390747618-f9ea2a96c487?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwZG9ybSUyMHJvb218ZW58MXx8fHwxNzYyNTU0OTI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      amenities: ["WiFi", "Parking", "Pool", "Laundry", "Pet-Friendly"],
      type: "apartment"
    },
    {
      id: "6",
      title: "Parkwest Apartments",
      address: "Jamboree Rd, Irvine, CA 92612",
      price: 1400,
      bedrooms: 1,
      bathrooms: 1,
      distance: "2.5 mi from UCI",
      available: "June 2025",
      image: "https://images.unsplash.com/photo-1563418536419-3a3ad6ef5efd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBpbnRlcmlvciUyMG1vZGVybnxlbnwxfHx8fDE3NjI1Nzg2NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      amenities: ["WiFi", "Parking", "Pool", "Gym Access"],
      type: "apartment"
    },
    {
      id: "7",
      title: "Newport North Apartments",
      address: "Bristol St N, Newport Beach, CA 92660",
      price: 1750,
      bedrooms: 2,
      bathrooms: 2,
      distance: "3.2 mi from UCI",
      available: "August 2025",
      image: "https://images.unsplash.com/photo-1504390747618-f9ea2a96c487?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwZG9ybSUyMHJvb218ZW58MXx8fHwxNzYyNTU0OTI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      amenities: ["WiFi", "Parking", "Pool", "Gym", "Near Beach"],
      type: "apartment"
    },
    {
      id: "8",
      title: "Costa Mesa Student Housing",
      address: "Harbor Blvd, Costa Mesa, CA 92626",
      price: 1300,
      bedrooms: 3,
      bathrooms: 2,
      distance: "4.5 mi from UCI",
      available: "July 2025",
      image: "https://images.unsplash.com/photo-1563418536419-3a3ad6ef5efd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBpbnRlcmlvciUyMG1vZGVybnxlbnwxfHx8fDE3NjI1Nzg2NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      amenities: ["WiFi", "Parking", "Laundry", "Pet-Friendly"],
      type: "house"
    },
    {
      id: "9",
      title: "Middle Earth Towers",
      address: "Middle Earth, Irvine, CA 92697",
      price: 1200,
      bedrooms: 1,
      bathrooms: 1,
      distance: "On Campus",
      available: "September 2025",
      image: "https://images.unsplash.com/photo-1504390747618-f9ea2a96c487?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwZG9ybSUyMHJvb218ZW58MXx8fHwxNzYyNTU0OTI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      amenities: ["WiFi", "Utilities Included", "Cafeteria Access", "Study Lounges"],
      type: "dorm"
    },
    {
      id: "10",
      title: "Mesa Court Residence Halls",
      address: "Mesa Ct, Irvine, CA 92697",
      price: 1150,
      bedrooms: 1,
      bathrooms: 1,
      distance: "On Campus",
      available: "August 2025",
      image: "https://images.unsplash.com/photo-1504390747618-f9ea2a96c487?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwZG9ybSUyMHJvb218ZW58MXx8fHwxNzYyNTU0OTI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      amenities: ["WiFi", "Utilities Included", "Cafeteria Access", "Shared Lounges"],
      type: "dorm"
    },
    {
      id: "11",
      title: "Orchard Hills Apartments",
      address: "Orchard Hills, Irvine, CA 92617",
      price: 1250,
      bedrooms: 2,
      bathrooms: 1,
      distance: "0.5 mi from UCI",
      available: "September 2025",
      image: "https://images.unsplash.com/photo-1563418536419-3a3ad6ef5efd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBpbnRlcmlvciUyMG1vZGVybnxlbnwxfHx8fDE3NjI1Nzg2NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      amenities: ["WiFi", "Parking", "Laundry", "Study Rooms"],
      type: "apartment"
    },
    {
      id: "12",
      title: "The Plaza Irvine",
      address: "Von Karman Ave, Irvine, CA 92612",
      price: 1900,
      bedrooms: 2,
      bathrooms: 2,
      distance: "3.8 mi from UCI",
      available: "July 2025",
      image: "https://images.unsplash.com/photo-1563418536419-3a3ad6ef5efd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBpbnRlcmlvciUyMG1vZGVybnxlbnwxfHx8fDE3NjI1Nzg2NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      amenities: ["WiFi", "Parking", "Pool", "Gym", "Concierge"],
      type: "apartment"
    }
  ];

  const handleHousingClick = (housing: Housing) => {
    setSelectedHousing(housing);
    setDetailOpen(true);
  };

  const handleProfileComplete = () => {
    setHasProfile(true);
    setProfileFormOpen(false);
    setActiveTab("roommates");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onProfileClick={() => setProfileFormOpen(true)}
      />

      {/* Hero Section */}
      {activeTab === "housing" && (
        <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 hover:from-blue-600 hover:to-blue-800">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url('https://images.unsplash.com/flagged/photo-1580408453889-ed5e1b51924a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwY2FtcHVzJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYyNTAxMTU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }} />
          </div>
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl">
              <h1 className="mb-4">Find Your Perfect UC Irvine Housing</h1>
              <p className="text-xl mb-8 text-blue-100">
                Discover housing options near UCI campus - from on-campus dorms to apartments in Irvine, Costa Mesa, and Newport Beach. Your Anteater home awaits!
              </p>
              <div className="flex flex-wrap gap-4">
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === "housing" && (
          <div className="space-y-8">
            <HousingFilters onFilterChange={() => {}} />
            
            <div className="mb-8">
              <h2 className="mb-3 text-2xl font-bold">Available Housing</h2>
              <p className="text-gray-600 text-lg">{mockHousingData.length} listings found</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockHousingData.map((housing) => (
                <HousingCard
                  key={housing.id}
                  housing={housing}
                  onClick={() => handleHousingClick(housing)}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === "roommates" && (
          <div>
            <div className="mb-8">
              <h2 className="mb-2">Find Your Perfect Roommate</h2>
              <p className="text-gray-600">
                Connect with fellow UCI students looking for compatible living situations
              </p>
            </div>

            {/* Show message if not signed in */}
            {!user && (
              <div className="text-center py-12 bg-blue-50 rounded-lg">
                <p className="text-gray-700 mb-4 text-lg">
                  Sign in to view and connect with potential roommates
                </p>
                <p className="text-sm text-gray-500">
                  Use your UCI Google account to get started
                </p>
              </div>
            )}

            {/* Show message if no profile */}
            {user && !hasProfile && (
              <div className="text-center py-12 bg-yellow-50 rounded-lg">
                <p className="text-gray-700 mb-4 text-lg">
                  Complete your profile to find compatible roommates
                </p>
                <Button onClick={() => setProfileFormOpen(true)}>
                  Complete Profile
                </Button>
              </div>
            )}

            {/* Show loading state */}
            {user && hasProfile && roommatesLoading && (
              <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <span className="ml-3 text-gray-600">Finding your perfect matches...</span>
              </div>
            )}

            {/* Show error state */}
            {user && hasProfile && roommatesError && (
              <div className="text-center py-12">
                <p className="text-red-600">Error loading roommates: {roommatesError}</p>
              </div>
            )}

            {/* Show roommates from Firebase */}
            {user && hasProfile && !roommatesLoading && !roommatesError && (
              <>
                <RoommateFilters onFilterChange={() => {}} />

                {matches.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 mb-4 text-lg">
                      No roommate matches found yet.
                    </p>
                    <p className="text-sm text-gray-500">
                      Check back soon as more students join!
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <p className="text-gray-600">
                        {matches.length} compatible roommate{matches.length !== 1 ? 's' : ''} found
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {matches.map((roommate) => (
                        <RoommateCard key={roommate.id} roommate={roommate} />
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        )}

        {activeTab === "guide" && <HousingGuide />}
      </main>

      <HousingDetail
        housing={selectedHousing}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />

      <ProfileForm
        open={profileFormOpen}
        onClose={() => setProfileFormOpen(false)}
        onComplete={handleProfileComplete}
      />
    </div>

  );
}
