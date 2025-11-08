import { useState } from "react";
import { Header } from "./components/Header";
import { HousingCard, Housing } from "./components/HousingCard";
import { RoommateCard, Roommate } from "./components/RoommateCard";
import { HousingFilters } from "./components/HousingFilters";
import { RoommateFilters } from "./components/RoommateFilters";
import { HousingGuide } from "./components/HousingGuide";
import { HousingDetail } from "./components/HousingDetail";
import { Button } from "./components/ui/button";
import { ArrowRight } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("housing");
  const [selectedHousing, setSelectedHousing] = useState<Housing | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

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

  const handleHousingClick = (housing: Housing) => {
    setSelectedHousing(housing);
    setDetailOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

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
          <div>
            <HousingFilters onFilterChange={() => {}} />
            
            <div className="mb-6">
              <h2 className="mb-2">Available Housing</h2>
              <p className="text-gray-600">{mockHousingData.length} listings found</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
