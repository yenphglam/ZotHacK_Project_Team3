import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { useState, useEffect } from "react";

interface HousingFiltersProps {
  onFilterChange: (filters: any) => void;
}

export function HousingFilters({ onFilterChange }: HousingFiltersProps) {
  // State for all filters
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [bedrooms, setBedrooms] = useState("any");
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [distance, setDistance] = useState("any");
  const [amenities, setAmenities] = useState<string[]>([]);

  // 🔥 AUTO-APPLY FILTERS - This runs whenever ANY filter changes
  useEffect(() => {
    console.log('🔍 Housing filters changed, applying...', {
      searchQuery,
      propertyType,
      bedrooms,
      priceRange,
      distance,
      amenities
    });

    onFilterChange({
      searchQuery,
      propertyType,
      bedrooms,
      priceRange,
      distance,
      amenities
    });
  }, [searchQuery, propertyType, bedrooms, priceRange, distance, amenities]);

  // Handle amenity toggle
  const handleAmenityToggle = (amenity: string) => {
    setAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setPropertyType("all");
    setBedrooms("any");
    setPriceRange([0, 3000]);
    setDistance("any");
    setAmenities([]);
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
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Property Type */}
        <Select value={propertyType} onValueChange={setPropertyType}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>
          <SelectContent position="popper" className="z-[10000]">
            <SelectItem value="All">All Types</SelectItem>
            <SelectItem value="Apartment">Apartment</SelectItem>
            <SelectItem value="House">House</SelectItem>
            <SelectItem value="Dorm">Dorm</SelectItem>
            <SelectItem value="Studio">Studio</SelectItem>
          </SelectContent>
        </Select>

        {/* Bedrooms */}
        <Select value={bedrooms} onValueChange={setBedrooms}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Bedrooms" />
          </SelectTrigger>
          <SelectContent position="popper" className="z-[10000]">
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
              {(amenities.length > 0 || distance !== 'any' || priceRange[0] !== 0 || priceRange[1] !== 3000) && (
                <span className="ml-2 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {amenities.length + (distance !== 'any' ? 1 : 0) + (priceRange[0] !== 0 || priceRange[1] !== 3000 ? 1 : 0)}
                </span>
              )}
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
                    <span>${priceRange[0]}/mo</span>
                    <span>${priceRange[1]}/mo</span>
                  </div>
                </div>
              </div>

              {/* Distance Section */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Distance from Campus</Label>
                <Select value={distance} onValueChange={setDistance}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any distance" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="z-[10000]">
                    <SelectItem value="any">Any distance</SelectItem>
                    <SelectItem value="walking">Walking distance</SelectItem>
                    <SelectItem value="1mi">Within 1 mile</SelectItem>
                    <SelectItem value="3mi">Within 3 miles</SelectItem>
                    <SelectItem value="5mi">Within 5 miles</SelectItem>
                  </SelectContent>
                </Select>
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

              {/* Reset Button */}
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={resetFilters}
              >
                Reset All Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filters Display */}
      {(searchQuery || propertyType !== 'all' || bedrooms !== 'any' || distance !== 'any' || amenities.length > 0 || priceRange[0] !== 0 || priceRange[1] !== 3000) && (
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="text-sm text-gray-600">Active filters:</span>
          
          {searchQuery && (
            <Badge variant="secondary">
              Search: {searchQuery}
              <button 
                onClick={() => setSearchQuery("")}
                className="ml-2"
              >
                ×
              </button>
            </Badge>
          )}
          
          {propertyType !== 'all' && (
            <Badge variant="secondary">
              {propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}
              <button 
                onClick={() => setPropertyType("all")}
                className="ml-2"
              >
                ×
              </button>
            </Badge>
          )}
          
          {bedrooms !== 'any' && (
            <Badge variant="secondary">
              {bedrooms === '3' ? '3+' : bedrooms} Bedroom{bedrooms !== '1' ? 's' : ''}
              <button 
                onClick={() => setBedrooms("any")}
                className="ml-2"
              >
                ×
              </button>
            </Badge>
          )}

          {(priceRange[0] !== 0 || priceRange[1] !== 3000) && (
            <Badge variant="secondary">
              ${priceRange[0]}-${priceRange[1]}/mo
              <button 
                onClick={() => setPriceRange([0, 3000])}
                className="ml-2"
              >
                ×
              </button>
            </Badge>
          )}

          {distance !== 'any' && (
            <Badge variant="secondary">
              {distance === 'walking' ? 'Walking distance' : 
               distance === '1mi' ? 'Within 1 mile' :
               distance === '3mi' ? 'Within 3 miles' :
               'Within 5 miles'}
              <button 
                onClick={() => setDistance("any")}
                className="ml-2"
              >
                ×
              </button>
            </Badge>
          )}
          
          {amenities.map(amenity => (
            <Badge key={amenity} variant="secondary">
              {amenity}
              <button 
                onClick={() => handleAmenityToggle(amenity)}
                className="ml-2"
              >
                ×
              </button>
            </Badge>
          ))}
          
        </div>
      )}
    </div>
  );
}
