import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { HousingCard, Housing } from "./components/HousingCard";
import { RoommateCard, Roommate } from "./components/RoommateCard";
import { HousingFilters } from "./components/HousingFilters";
import { RoommateFilters } from "./components/RoommateFilters";
import { HousingGuide } from "./components/HousingGuide";
import { HousingDetail } from "./components/HousingDetail";
import { Button } from "./components/ui/button";
import { ArrowRight, Search } from "lucide-react";


export default function App() {
  const [activeTab, setActiveTab] = useState<string>("housing");
  const [selectedHousing, setSelectedHousing] = useState<Housing | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [filteredHousing, setFilteredHousing] = useState<Housing[]>([]);


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
      amenities: ["Wifi", "Parking", "Pool", "Study Rooms", "Gym Access", "Study Lounges", "Private Bathrooms", "Laundry", ""],
      type: "Apartment"
    },
    {
      id: "2",
      title: "American Campus Communities",
      address: "4000 Plaza Verde, Irvine, CA 92612",
      price: "1,200-1,800",
      bedrooms: "2-3",
      distance: "On Campus",
      image: "https://www.americancampus.com/getmedia/5e1af59f-6396-4724-ba31-df31804976e2/760_Main-Hero_1440x576.jpg",
      amenities: ["Furnished", "Wifi", "Parking", "Utilities Included", "Basketball Court", "Controlled access", "Study lounge", "Courtyard",
    "BBQ area"],
      type: "Apartment"
    },
    {
      id: "3",
      title: "Vista del Campo Norte",
      address: "3000 Arroyo Dr, Irvine, CA 92617",
      price: "1,300-1,800",
      bedrooms: "2/4",
      distance: "On Campus",
      image: "https://lh3.googleusercontent.com/p/AF1QipPpB9scLgOHwI3lxlzgg3HzB-zjh0-BzeFqeMik=s1360-w1360-h1020-rw",
      amenities: ["Wifi", "Parking", "Pool", "Gym Access", "Laundry"],
      type: "Apartment"
    },




    {
      id: "5",
      title: "Harvard & Cornell Court",
      address: "20 Harvard Ct, Irvine, CA 92612",
      price: "2,500-3,400",
      bedrooms: "1-3",
      distance: "0.4 from campus",
      image: "https://dynamicmedia.irvinecompany.com/is/image/content/dam/apartments/3-readytopublish/communities/orangecounty/irvine/universitytowncenter/harvardcourt/photography/Harvard-CMF-4236.jpg?&wid=1920&iccEmbed=1&icc=AdobeRGB&resMode=sharp2&fmt=pjpeg&pscan=auto",
      amenities: [ "Pool",
      "Fitness center",
      "Study lounge",
      "Events",
      "Furnished apartments",
      "Laundry",
      "BBQ area",
      "Wifi"],
      type: "Apartment"
    },
    {
      id: "6",
      title: "Stanford Court",
      address: "20 Peters Canyon Rd, Irvine, CA 92606",
      price: "2,300-3,100",
      bedrooms: "1",
      distance: "0.3 mi from UCI",
      image: "https://dynamicmedia.irvinecompany.com/is/image/content/dam/apartments/3-readytopublish/communities/orangecounty/irvine/universitytowncenter/stanfordcourt/photography/Stanford-CMF-4339.jpg?&crop=0,751,7195,4049&wid=1360&iccEmbed=1&icc=AdobeRGB&resMode=sharp2&fmt=pjpeg&pscan=auto",
      amenities: ["Pool",
      "Fitness center",
      "Clubhouse",
      "Pet-friendly",
      "Parking",
      "Wifi",
      "BBQ area"],
      type: "Apartment"
    },
    {
      id: "7",
      title: "Berkeley & Columbia Court",
      address: "100 Columbia, Irvine, CA 92612",
      price: "2,400-3,000",
      bedrooms: "1-2",
      distance: "0.3 mi from UCI",
      image: "https://dynamicmedia.irvinecompany.com/is/image/content/dam/apartments/3-readytopublish/communities/orangecounty/irvine/universitytowncenter/berkeleycourt/photography/BerkeleyCourt-MasterBedroom-CMF-6948.jpg?&wid=1920&iccEmbed=1&icc=AdobeRGB&resMode=sharp2&fmt=pjpeg&pscan=auto",
      amenities: ["Workspace",
      "Fitness center",
      "Laundry",
      "Parking",
      "BBQ area",
      "Smoke-free",
      "Wifi",
      "Bike storage",
      "Pool",
      "Hot tub"],
      type: "Apartment"
    },
    {
      id: "8",
      title: "Park West Apartments",
      address: "3883 Parkview Ln, Irvine, CA 92612",
      price: "2,000-3,800",
      bedrooms: "Studio, 1-3",
      distance: "1.5 mi from UCI",
      image: "https://images1.apartments.com/i2/QOu1ARrZ-1_B2MuAI3bhrBiWPgoLQlkKwCggyhWSLo4/116/park-west-apartment-homes-irvine-ca-building-photo.jpg?p=1",
      amenities: ["Pool",
      "Fitness center",
      "Tennis court",
      "Clubhouse",
      "BBQ area",
      "Basketball court",
      "Laundry",
      "Pet-friendly",
      "24-hour maintenance",
      "Wifi"],
      type: "Apartment"
    },
    {
      id: "9",
      title: "Toscana Apartments",
      address: "35 Via Lucca, Irvine, CA 92612",
      price: "2,600-3,600",
      bedrooms: "1",
      distance: "2.3 mi from campus",
      image: "https://media.equityapartments.com/images/q_auto/f_auto/fl_lossy/1558-127/toscana-apartments-living-room",
      amenities: ["Pool",
      "Fitness center",
      "Yoga room",
      "Clubhouse",
      "Courtyard",
      "Pet-friendly",
      "Package lockers",
      "Controlled access",
      "Wifi"
],
      type: "Apartment"
    },
    {
      id: "10",
      title: "Axis 2300",
      address: "2300 Dupont Dr, Irvine, CA 92612",
      price: "2,500-3,500",
      bedrooms: "Studio, 1-2",
      distance: "2.7 mi from campus",
      image: "https://images1.apartments.com/i2/fckkHRWFFGJxv0O4l6gANahLhsTsJa4yffRVmT5UMO0/116/axis-2300-apartments-irvine-ca-building-photo.jpg?p=1",
      amenities: [ "Rooftop deck",
      "Fitness center",
      "Pool",
      "Study lounge",
      "Pet-friendly",
      "Bike storage",
      "Package lockers",
      "Controlled access",
      "Wifi"],
      type: "Apartment"
    },
    {
      id: "11",
      title: "Villa Siena Apartments",
      address: "25 Palatine, Irvine, CA 92612",
      price: "2,400-3,600",
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
      price: "3,000-4,200",
      bedrooms: "2",
      distance: "2.7 mi from UCI",
      image: "https://cdngeneral.point2homes.com/dmslivecafe/2/93425/Garden_Elements_Metal__06112021%20(5).jpg?width=1600&quality=80",
      amenities: ["Pool",
      "BBQ area",
      "Fitness center",
      "Yoga room",
      "Study lounge",
      "Clubhouse",
      "EV charging",
      "Pet-friendly",
      "Laundry",
      "Parking",
      "Smoke-free",
      "Wifi"
],
      type: "Apartment"
    }


  ];


  // UCI Students looking for roommates
  const mockRoommateData: Roommate[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      age: 20,
      major: "Computer Science",
      year: "Junior",
      bio: "UCI CS major looking for a clean, organized roommate near campus. I'm friendly but appreciate personal space, especially during finals.",
      budget: "$700-900/month",
      moveInDate: "August 2025",
      preferences: ["Clean & Organized", "Quiet Hours", "Non-Smoker"],
      interests: ["Coding", "Hiking", "Boba runs"],
      verified: true,
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBzdHVkeWluZ3xlbnwxfHx8fDE3NjI1MDU4ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "2",
      name: "Michael Chen",
      age: 21,
      major: "Business Economics",
      year: "Senior",
      bio: "Looking for roommate in UTC area. Love cooking Asian food and hosting small gatherings. Respectful of study time and boundaries.",
      budget: "$800-1100/month",
      moveInDate: "July 2025",
      preferences: ["Social & Friendly", "Shared Cooking", "Pet-Friendly"],
      interests: ["Gaming", "Cooking", "Basketball at ARC"],
      verified: true,
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBzdHVkeWluZ3xlbnwxfHx8fDE3NjI1MDU4ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      age: 19,
      major: "Biological Sciences",
      year: "Sophomore",
      bio: "Pre-med Anteater looking for roommate at Campus Village or Arroyo Vista. Early bird who studies a lot but loves weekend beach trips to Newport.",
      budget: "$600-850/month",
      moveInDate: "August 2025",
      preferences: ["Early Riser", "Clean & Organized", "Quiet Hours"],
      interests: ["Yoga", "Running", "Beach walks"],
      verified: true,
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBzdHVkeWluZ3xlbnwxfHx8fDE3NjI1MDU4ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "4",
      name: "David Kim",
      age: 22,
      major: "Electrical Engineering",
      year: "Graduate",
      bio: "Grad student at UCI looking for mature roommate near campus. Working on research projects but enjoy good coffee talks at Anteatery.",
      budget: "$900-1200/month",
      moveInDate: "September 2025",
      preferences: ["Quiet Hours", "Non-Smoker", "Clean & Organized"],
      interests: ["Photography", "Coffee", "Tech meetups"],
      verified: true,
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBzdHVkeWluZ3xlbnwxfHx8fDE3NjI1MDU4ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "5",
      name: "Jessica Martinez",
      age: 20,
      major: "Psychology",
      year: "Junior",
      bio: "Looking for roommate at Verano Place or nearby. Love decorating and making our place cozy. Down for Trader Joe's runs and exploring Irvine.",
      budget: "$700-950/month",
      moveInDate: "June 2025",
      preferences: ["Social & Friendly", "Pet-Friendly", "Shared Cooking"],
      interests: ["Plants", "Art", "Exploring OC"],
      verified: false,
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBzdHVkeWluZ3xlbnwxfHx8fDE3NjI1MDU4ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "6",
      name: "Alex Thompson",
      age: 21,
      major: "Film & Media Studies",
      year: "Senior",
      bio: "UCI senior looking for chill roommate. I edit videos late but always use headphones. Love exploring LA on weekends.",
      budget: "$800-1100/month",
      moveInDate: "August 2025",
      preferences: ["Flexible Hours", "Social & Friendly", "Non-Smoker"],
      interests: ["Video Production", "Photography", "Movies"],
      verified: true,
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBzdHVkeWluZ3xlbnwxfHx8fDE3NjI1MDU4ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "7",
      name: "Priya Patel",
      age: 20,
      major: "Data Science",
      year: "Junior",
      bio: "Data Science major seeking roommate for fall. Organized and friendly. Love working on projects at Langson Library and trying new restaurants in Irvine.",
      budget: "$750-1000/month",
      moveInDate: "September 2025",
      preferences: ["Clean & Organized", "Social & Friendly", "Non-Smoker"],
      interests: ["Data viz", "Food", "Volleyball"],
      verified: true,
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBzdHVkeWluZ3xlbnwxfHx8fDE3NjI1MDU4ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "8",
      name: "Ryan Martinez",
      age: 19,
      major: "Mechanical Engineering",
      year: "Sophomore",
      bio: "Engineering student looking for roommate near UTC. Into gym, gaming, and weekend trips. Clean and respectful, looking for same.",
      budget: "$700-950/month",
      moveInDate: "August 2025",
      preferences: ["Clean & Organized", "Gym Buddy", "Non-Smoker"],
      interests: ["Weightlifting", "Gaming", "Cars"],
      verified: true,
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBzdHVkeWluZ3xlbnwxfHx8fDE3NjI1MDU4ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];


  // Initialize filtered housing data
  useEffect(() => {
    setFilteredHousing(mockHousingData);
  }, []);


  const handleFilterChange = (filters: { searchTerm?: string }) => {
    let filtered = mockHousingData;


    if (filters.searchTerm && filters.searchTerm.trim() !== "") {
      const searchLower = filters.searchTerm.toLowerCase().trim();
      filtered = filtered.filter((housing) => {
        // Search in basic properties
        const basicMatch = (
          housing.title.toLowerCase().includes(searchLower) ||
          housing.address.toLowerCase().includes(searchLower) ||
          housing.distance.toLowerCase().includes(searchLower) ||
          housing.type.toLowerCase().includes(searchLower) ||
          housing.price.toLowerCase().includes(searchLower) ||
          housing.bedrooms.toLowerCase().includes(searchLower)
        );


        // Search in amenities
        const amenitiesMatch = housing.amenities.some(amenity =>
          amenity.toLowerCase().includes(searchLower)
        );


        // Search for common location terms
        const locationMatch = (
          (searchLower.includes('campus') && housing.distance.toLowerCase().includes('campus')) ||
          (searchLower.includes('irvine') && housing.address.toLowerCase().includes('irvine')) ||
          (searchLower.includes('uci') && housing.distance.toLowerCase().includes('uci')) ||
          (searchLower.includes('on campus') && housing.distance.toLowerCase().includes('on campus')) ||
          (searchLower.includes('off campus') && !housing.distance.toLowerCase().includes('on campus'))
        );


        return basicMatch || amenitiesMatch || locationMatch;
      });
    }


    setFilteredHousing(filtered);
  };


  const handleHousingClick = (housing: Housing) => {
    setSelectedHousing(housing);
    setDetailOpen(true);
  };


  return (
    <div className="min-h-screen bg-white">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />


      {/* Hero Section */}
      {activeTab === "housing" && (
        <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
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
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Browse Listings
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Post a Listing
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === "housing" && (
          <div>
            <HousingFilters onFilterChange={handleFilterChange} />
           
            <div className="mb-6">
              <h2 className="mb-2">Available Housing</h2>
              <p className="text-gray-600">
                {filteredHousing.length} of {mockHousingData.length} listings found
              </p>
            </div>


            {filteredHousing.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No housing found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search terms or filters to find more results.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    // This will trigger a reset by calling the filter with empty search
                    handleFilterChange({ searchTerm: "" });
                  }}
                >
                  Show All Listings
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <h2 className="mb-2">Find Your Perfect Roommate</h2>
              <p className="text-gray-600">
                Connect with fellow students looking for compatible living situations
              </p>
            </div>


            <RoommateFilters onFilterChange={() => {}} />


            <div className="mb-6">
              <p className="text-gray-600">{mockRoommateData.length} profiles available</p>
            </div>


            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockRoommateData.map((roommate) => (
                <RoommateCard key={roommate.id} roommate={roommate} />
              ))}
            </div>
          </div>
        )}


        {activeTab === "guide" && <HousingGuide />}
      </main>


      <HousingDetail
        housing={selectedHousing}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />
    </div>
  );
}
