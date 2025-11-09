import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react"; // ✅ Add this

interface HousingFiltersProps {
  onFilterChange: (filters: any) => void;
}

export function HousingFilters({ onFilterChange }: HousingFiltersProps) {
  // ✅ Add state for all filters
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [bedrooms, setBedrooms] = useState("any");
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [distance, setDistance] = useState("any");
  const [amenities, setAmenities] = useState<string[]>([]);

  // ✅ Handle amenity toggle
  const handleAmenityToggle = (amenity: string) => {
    setAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  // ✅ Apply filters
  const applyFilters = () => {
    onFilterChange({
      searchQuery,
      propertyType,
      bedrooms,
      priceRange,
      distance,
      amenities
    });
  };

    // ✅ Add reset function
  const resetFilters = () => {
    setSearchQuery("");
    setPropertyType("all");
    setBedrooms("any");
    setPriceRange([0, 3000]);
    setDistance("any");
    setAmenities([]);
    onFilterChange({
      searchQuery: "",
      propertyType: "all",
      bedrooms: "any",
      priceRange: [0, 3000],
      distance: "any",
      amenities: []
    });
  };

  return (
    <div className="bg-white border rounded-lg p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by location, neighborhood..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                applyFilters(); // Apply on every keystroke
              }}
            />
          </div>
        </div>

        {/* Property Type */}
        <Select value={propertyType} onValueChange={(value) => {
          setPropertyType(value);
          applyFilters();
        }}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="house">House</SelectItem>
            <SelectItem value="dorm">Dorm</SelectItem>
            <SelectItem value="studio">Studio</SelectItem>
          </SelectContent>
        </Select>

        {/* Bedrooms */}
        <Select value={bedrooms} onValueChange={(value) => {
          setBedrooms(value);
          applyFilters();
        }}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Bedrooms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="1">1 Bedroom</SelectItem>
            <SelectItem value="2">2 Bedrooms</SelectItem>
            <SelectItem value="3">3+ Bedrooms</SelectItem>
          </SelectContent>
        </Select>

        {/* More Filters Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto p-6">
            <SheetHeader className="mb-6">
              <SheetTitle>Filter Options</SheetTitle>
            </SheetHeader>
            <div className="space-y-8">
              {/* Price Range Section */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Price Range</Label>
                <div className="pt-2 px-2">
                  <Slider 
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={3000} 
                    min={0} 
                    step={50} 
                  />
                  <div className="flex justify-between mt-3 text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Amenities Section */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Amenities</Label>
                <div className="space-y-4 pl-1">
                  {['Parking', 'WiFi', 'Laundry', 'Pet-Friendly', 'Furnished', 'Utilities Included'].map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-3">
                      <Checkbox 
                        id={amenity}
                        checked={amenities.includes(amenity)}
                        onCheckedChange={() => handleAmenityToggle(amenity)}
                      />
                      <label 
                        htmlFor={amenity} 
                        className="text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Distance Section */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Distance from Campus</Label>
                <Select value={distance} onValueChange={setDistance}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any distance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any distance</SelectItem>
                    <SelectItem value="walking">Walking distance</SelectItem>
                    <SelectItem value="1mi">Within 1 mile</SelectItem>
                    <SelectItem value="3mi">Within 3 miles</SelectItem>
                    <SelectItem value="5mi">Within 5 miles</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Reset Button */}
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={resetFilters}
              >
                Reset Filters
              </Button>

              {/* Apply Button */}
              <Button className="w-full mt-6" onClick={applyFilters}>
                Apply Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
