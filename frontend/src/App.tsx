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
import { Loader2, Users } from "lucide-react";
import { useRoommates } from "./hooks/useRoommates";
import { auth } from "./lib/firebase";
import { getUserProfile } from "./lib/firebase";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("housing");
  const [selectedHousing, setSelectedHousing] = useState<Housing | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const [user, setUser] = useState<any>(null);
  const [hasProfile, setHasProfile] = useState(false);
  const [profileFormOpen, setProfileFormOpen] = useState(false);

  // Fetch roommates from Firebase
  const { roommates, loading: roommatesLoading, error: roommatesError } = useRoommates();

  // Filtered roommates state
  const [filteredRoommates, setFilteredRoommates] = useState<any[]>([]);

  // Initialize filtered roommates when roommates load
  useEffect(() => {
    setFilteredRoommates(roommates);
  }, [roommates]);

  useEffect(() => {
    console.log('📊 Roommates Debug:', {
      count: roommates.length,
      loading: roommatesLoading,
      error: roommatesError,
      roommates: roommates
    });
  }, [roommates, roommatesLoading, roommatesError]);

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
      title: "Plaza Verde Apartments",
      address: "Campus Dr, Irvine, CA 92617",
      price: "$1,400–$1,900",
      bedrooms: "1-4",
      distance: "On Campus",
      image: "https://www.americancampus.com/getmedia/43aa50d3-94ff-45f5-ad2a-a10858d718dd/728_Main-Hero_1440x576.jpg",
      amenities: ["Wifi", "Parking", "Pool", "Study Rooms", "Gym Access", "Study Lounges", "Private Bathrooms", "Laundry"],
      type: "Apartment"
    },
    {
      id: "2",
      title: "American Campus Communities",
      address: "4000 Plaza Verde, Irvine, CA 92612",
      price: "$1,200-$1,800",
      bedrooms: "2-3",
      distance: "On Campus",
      image: "https://www.americancampus.com/getmedia/5e1af59f-6396-4724-ba31-df31804976e2/760_Main-Hero_1440x576.jpg",
      amenities: ["Furnished", "Wifi", "Parking", "Utilities Included", "Basketball Court", "Controlled access", "Study lounge", "Courtyard", "BBQ area"],
      type: "Apartment"
    },
    {
      id: "3",
      title: "Vista del Campo Norte",
      address: "3000 Arroyo Dr, Irvine, CA 92617",
      price: "$1,300-$1,800",
      bedrooms: "2-4",
      distance: "On Campus",
      image: "https://lh3.googleusercontent.com/p/AF1QipPpB9scLgOHwI3lxlzgg3HzB-zjh0-BzeFqeMik=s1360-w1360-h1020-rw",
      amenities: ["Wifi", "Parking", "Pool", "Gym Access", "Laundry"],
      type: "Apartment"
    },
    {
      id: "4",
      title: "University Town Center Condos",
      address: "Campus Dr, Irvine, CA 92612",
      price: "$1,800",
      bedrooms: "2",
      distance: "1.5 mi from UCI",
      image: "https://images.unsplash.com/photo-1563418536419-3a3ad6ef5efd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBpbnRlcmlvciUyMG1vZGVybnxlbnwxfHx8fDE3NjI1Nzg2NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      amenities: ["WiFi", "Parking", "Pool", "Gym", "Near Shopping"],
      type: "Apartment"
    },
    {
      id: "5",
      title: "Harvard & Cornell Court",
      address: "20 Harvard Ct, Irvine, CA 92612",
      price: "$2,500-$3,400",
      bedrooms: "1-3",
      distance: "0.4 mi from campus",
      image: "https://dynamicmedia.irvinecompany.com/is/image/content/dam/apartments/3-readytopublish/communities/orangecounty/irvine/universitytowncenter/harvardcourt/photography/Harvard-CMF-4236.jpg?&wid=1920&iccEmbed=1&icc=AdobeRGB&resMode=sharp2&fmt=pjpeg&pscan=auto",
      amenities: ["Pool", "Fitness center", "Study lounge", "Events", "Furnished apartments", "Laundry", "BBQ area", "Wifi"],
      type: "Apartment"
    },
    {
      id: "6",
      title: "Stanford Court",
      address: "20 Peters Canyon Rd, Irvine, CA 92606",
      price: "$2,300-$3,100",
      bedrooms: "1",
      distance: "0.3 mi from UCI",
      image: "https://dynamicmedia.irvinecompany.com/is/image/content/dam/apartments/3-readytopublish/communities/orangecounty/irvine/universitytowncenter/stanfordcourt/photography/Stanford-CMF-4339.jpg?&crop=0,751,7195,4049&wid=1360&iccEmbed=1&icc=AdobeRGB&resMode=sharp2&fmt=pjpeg&pscan=auto",
      amenities: ["Pool", "Fitness center", "Clubhouse", "Pet-friendly", "Parking", "Wifi", "BBQ area"],
      type: "Apartment"
    },
    {
      id: "7",
      title: "Berkeley & Columbia Court",
      address: "100 Columbia, Irvine, CA 92612",
      price: "$2,400-$3,000",
      bedrooms: "1-2",
      distance: "0.3 mi from UCI",
      image: "https://dynamicmedia.irvinecompany.com/is/image/content/dam/apartments/3-readytopublish/communities/orangecounty/irvine/universitytowncenter/berkeleycourt/photography/BerkeleyCourt-MasterBedroom-CMF-6948.jpg?&wid=1920&iccEmbed=1&icc=AdobeRGB&resMode=sharp2&fmt=pjpeg&pscan=auto",
      amenities: ["Workspace", "Fitness center", "Laundry", "Parking", "BBQ area", "Smoke-free", "Wifi", "Bike storage", "Pool", "Hot tub"],
      type: "Apartment"
    },
    {
      id: "8",
      title: "Park West Apartments",
      address: "3883 Parkview Ln, Irvine, CA 92612",
      price: "$2,000-$3,800",
      bedrooms: "Studio, 1-3",
      distance: "1.5 mi from UCI",
      image: "https://images1.apartments.com/i2/QOu1ARrZ-1_B2MuAI3bhrBiWPgoLQlkKwCggyhWSLo4/116/park-west-apartment-homes-irvine-ca-building-photo.jpg?p=1",
      amenities: ["Pool", "Fitness center", "Tennis court", "Clubhouse", "BBQ area", "Basketball court", "Laundry", "Pet-friendly", "24-hour maintenance", "Wifi"],
      type: "Apartment"
    },
    {
      id: "9",
      title: "Toscana Apartments",
      address: "35 Via Lucca, Irvine, CA 92612",
      price: "$2,600-$3,600",
      bedrooms: "1",
      distance: "2.3 mi from campus",
      image: "https://media.equityapartments.com/images/q_auto/f_auto/fl_lossy/1558-127/toscana-apartments-living-room",
      amenities: ["Pool", "Fitness center", "Yoga room", "Clubhouse", "Courtyard", "Pet-friendly", "Package lockers", "Controlled access", "Wifi"],
      type: "Apartment"
    },
    {
      id: "10",
      title: "Axis 2300",
      address: "2300 Dupont Dr, Irvine, CA 92612",
      price: "$2,500-$3,500",
      bedrooms: "Studio, 1-2",
      distance: "2.7 mi from campus",
      image: "https://images1.apartments.com/i2/fckkHRWFFGJxv0O4l6gANahLhsTsJa4yffRVmT5UMO0/116/axis-2300-apartments-irvine-ca-building-photo.jpg?p=1",
      amenities: ["Rooftop deck", "Fitness center", "Pool", "Study lounge", "Pet-friendly", "Bike storage", "Package lockers", "Controlled access", "Wifi"],
      type: "Apartment"
    },
    {
      id: "11",
      title: "Villa Siena Apartments",
      address: "25 Palatine, Irvine, CA 92612",
      price: "$2,400-$3,600",
      bedrooms: "Studio, 1-3",
      distance: "1.6 mi from UCI",
      image: "https://i.rent.com/t_w_webp_2xl/0811a77c3c32836ca17751c8d5ea19ad",
      amenities: ["Wifi", "Parking", "Laundry", "Study Rooms"],
      type: "Apartment"
    },
    {
      id: "12",
      title: "Elements Apartments",
      address: "1000 Elements Way, Irvine, CA 92612",
      price: "$3,000-$4,200",
      bedrooms: "2",
      distance: "2.7 mi from UCI",
      image: "https://cdngeneral.point2homes.com/dmslivecafe/2/93425/Garden_Elements_Metal__06112021%20(5).jpg?width=1600&quality=80",
      amenities: ["Pool", "BBQ area", "Fitness center", "Yoga room", "Study lounge", "Clubhouse", "EV charging", "Pet-friendly", "Laundry", "Parking", "Smoke-free", "Wifi"],
      type: "Apartment"
    }
  ];

  const [filteredHousing, setFilteredHousing] = useState<Housing[]>(mockHousingData);

  const handleFilterChange = (filters: any) => {
    console.log('🔍 Applying filters:', filters);
    
    let filtered = mockHousingData;

    // Search query - search in title, address, and amenities
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(housing => 
        housing.title.toLowerCase().includes(query) ||
        housing.address.toLowerCase().includes(query) ||
        housing.amenities.some(a => a.toLowerCase().includes(query))
      );
    }

    // Property type
    if (filters.propertyType && filters.propertyType !== 'all') {
      filtered = filtered.filter(housing => housing.type === filters.propertyType);
    }

    // Bedrooms
    if (filters.bedrooms && filters.bedrooms !== 'any') {
      const bedroomCount = parseInt(filters.bedrooms);
      filtered = filtered.filter(housing => {
        const bedroomStr = housing.bedrooms.toLowerCase();
        // Handle ranges like "1-4", "2-3", etc.
        if (bedroomStr.includes('-')) {
          const [min, max] = bedroomStr.split('-').map(s => parseInt(s.trim()));
          if (bedroomCount === 3) {
            // 3+ bedrooms - check if max is >= 3
            return max >= 3;
          }
          return bedroomCount >= min && bedroomCount <= max;
        }
        // Handle "Studio, 1-3" format
        if (bedroomStr.includes(',')) {
          if (bedroomStr.includes('studio') && bedroomCount === 0) return true;
          const match = bedroomStr.match(/(\d+)-(\d+)/);
          if (match) {
            const [, min, max] = match.map(s => parseInt(s));
            if (bedroomCount === 3) {
              return max >= 3;
            }
            return bedroomCount >= min && bedroomCount <= max;
          }
        }
        // Handle single number
        const num = parseInt(bedroomStr);
        if (!isNaN(num)) {
          if (bedroomCount === 3) {
            return num >= 3;
          }
          return num === bedroomCount;
        }
        return false;
      });
    }

    // Price range
    if (filters.priceRange && filters.priceRange.length === 2) {
      filtered = filtered.filter(housing => {
        // Extract numbers from price string
        const priceStr = housing.price.replace(/[$,]/g, '');
        const prices = priceStr.split(/[-–]/).map(p => parseInt(p.trim()));
        
        if (prices.length === 2) {
          // Range like "$1,400-$1,900"
          const [minPrice, maxPrice] = prices;
          // Check if there's any overlap between the ranges
          return maxPrice >= filters.priceRange[0] && minPrice <= filters.priceRange[1];
        } else if (prices.length === 1) {
          // Single price like "$1,800"
          const price = prices[0];
          return price >= filters.priceRange[0] && price <= filters.priceRange[1];
        }
        return false;
      });
    }

    // Distance
    if (filters.distance && filters.distance !== 'any') {
      filtered = filtered.filter(housing => {
        const distance = housing.distance.toLowerCase();
        
        if (filters.distance === 'walking') {
          return distance.includes('on campus') || distance.includes('0.') || distance === 'on campus';
        } else if (filters.distance === '1mi') {
          return distance.includes('on campus') || 
                (distance.includes('mi') && parseFloat(distance) <= 1);
        } else if (filters.distance === '3mi') {
          return distance.includes('on campus') || 
                (distance.includes('mi') && parseFloat(distance) <= 3);
        } else if (filters.distance === '5mi') {
          return distance.includes('on campus') || 
                (distance.includes('mi') && parseFloat(distance) <= 5);
        }
        
        return true;
      });
    }

    // Amenities - housing must have ALL selected amenities
    if (filters.amenities && filters.amenities.length > 0) {
      filtered = filtered.filter(housing => 
        filters.amenities.every((amenity: string) => 
          housing.amenities.some(a => 
            a.toLowerCase().includes(amenity.toLowerCase()) ||
            amenity.toLowerCase().includes(a.toLowerCase())
          )
        )
      );
    }

    console.log('✅ Filtered results:', filtered.length);
    setFilteredHousing(filtered);
  };

  const handleHousingClick = (housing: Housing) => {
    setSelectedHousing(housing);
    setDetailOpen(true);
  };

  const handleProfileComplete = () => {
    setHasProfile(true);
    setProfileFormOpen(false);
    setActiveTab("roommates");
  };

  const handleRoommateFilterChange = (filters: any) => {
    console.log('🔍 Applying roommate filters:', filters);
    
    let filtered = roommates;

    // Search query
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(roommate => 
        roommate.name.toLowerCase().includes(query) ||
        roommate.major.toLowerCase().includes(query) ||
        roommate.bio.toLowerCase().includes(query) ||
        roommate.interests.some((i: string) => i.toLowerCase().includes(query))
      );
    }

    // Academic year
    if (filters.year && filters.year !== 'all') {
      filtered = filtered.filter(roommate => roommate.year === filters.year);
    }

    // Budget range - check if budgets overlap
    if (filters.budgetRange && filters.budgetRange.length === 2) {
      filtered = filtered.filter(roommate => {
        const overlap = 
          Math.min(roommate.budgetMax, filters.budgetRange[1]) -
          Math.max(roommate.budgetMin, filters.budgetRange[0]);
        return overlap > 0;
      });
    }

    // Sleep schedule
    if (filters.sleepSchedule && filters.sleepSchedule !== 'any') {
      filtered = filtered.filter(roommate => 
        roommate.sleepSchedule === filters.sleepSchedule ||
        roommate.sleepSchedule === 'flexible' ||
        filters.sleepSchedule === 'flexible'
      );
    }

    // Cleanliness level
    if (filters.cleanliness && filters.cleanliness.length === 2) {
      filtered = filtered.filter(roommate => {
        const roommateClean = roommate.cleanliness[0];
        return roommateClean >= filters.cleanliness[0] && 
               roommateClean <= filters.cleanliness[1];
      });
    }

    // Move-in date
    if (filters.moveInDate && filters.moveInDate !== 'any') {
      filtered = filtered.filter(roommate => 
        roommate.moveInDate === filters.moveInDate ||
        roommate.moveInDate === 'Flexible' ||
        filters.moveInDate === 'Flexible'
      );
    }

    // Preferences
    if (filters.preferences && filters.preferences.length > 0) {
      filtered = filtered.filter(roommate => {
        const prefMap: Record<string, keyof typeof roommate.preferences> = {
          'Clean & Organized': 'cleanOrganized',
          'Quiet Hours': 'quietHours',
          'Non-Smoker': 'nonSmoker',
          'Pets Allowed': 'petsAllowed',
          'Guests Okay': 'guestsOk'
        };

        return filters.preferences.every((pref: string) => {
          const prefKey = prefMap[pref];
          return prefKey && roommate.preferences[prefKey] === true;
        });
      });
    }

    // Minimum match score
    if (filters.minMatchScore && filters.minMatchScore > 0) {
      filtered = filtered.filter(roommate => 
        (roommate.matchScore || 0) >= filters.minMatchScore
      );
    }

    console.log('✅ Filtered roommates:', filtered.length);
    setFilteredRoommates(filtered);
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
        <div className="relative text-white py-20" style={{ background: 'linear-gradient(to bottom right, rgb(17, 63, 103), rgb(12, 45, 75))' }}>
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
              <p className="text-xl mb-8" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Discover housing options near UCI campus - from on-campus dorms to apartments in Irvine, Costa Mesa, and Newport Beach. Your Anteater home awaits!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === "housing" && (
          <div className="space-y-8">
            <HousingFilters onFilterChange={handleFilterChange} />
            
            <div className="mb-8">
              <h2 className="mb-3 text-2xl font-bold">Available Housing</h2>
              <p className="text-gray-600 text-lg">{filteredHousing.length} listings found</p>
            </div>

            {filteredHousing.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-lg mb-2">No housing matches your filters</p>
                <p className="text-sm text-gray-500">Try adjusting your search criteria</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredHousing.map((housing) => (
                  <HousingCard
                    key={housing.id}
                    housing={housing}
                    onClick={() => handleHousingClick(housing)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "roommates" && (
          <div>
            <div className="mb-8">
              <h2 className="mb-3 text-2xl font-bold">Find Your Perfect Roommate</h2>
              <p className="text-gray-600">
                {filteredRoommates.length} compatible roommate{filteredRoommates.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {/* Single Filter Bar */}
            <RoommateFilters onFilterChange={handleRoommateFilterChange} />

            {/* Show message if not signed in */}
            {!user && (
              <div className="text-center py-12 rounded-lg" style={{ backgroundColor: 'rgba(17, 63, 103, 0.05)' }}>
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
                <Loader2 className="h-8 w-8 animate-spin" style={{ color: 'rgb(17, 63, 103)' }} />
                <span className="ml-3 text-gray-600">Finding your perfect matches...</span>
              </div>
            )}

            {/* Show error state */}
            {user && hasProfile && roommatesError && (
              <div className="text-center py-12">
                <p className="text-red-600">Error loading roommates: {roommatesError}</p>
              </div>
            )}

            {/* Show roommates */}
            {user && hasProfile && !roommatesLoading && !roommatesError && (
              <>
                {roommates.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4 text-lg">
                      No roommate matches found yet.
                    </p>
                    <p className="text-sm text-gray-500">
                      Check back soon as more students join!
                    </p>
                  </div>
                ) : filteredRoommates.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No roommates match your filters
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Try adjusting your search criteria to see more results
                    </p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRoommates.map((roommate) => (
                      <RoommateCard key={roommate.id} roommate={roommate} />
                    ))}
                  </div>
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
