import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Checkbox } from "./ui/checkbox";

interface HousingFiltersProps {
  onFilterChange: (filters: any) => void;
}

export function HousingFilters({ onFilterChange }: HousingFiltersProps) {
  return (
    <div className="bg-white border rounded-lg p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by location, neighborhood..."
              className="pl-10"
            />
          </div>
        </div>

        <Select>
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

        <Select>
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

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Options</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              <div>
                <Label className="mb-3">Price Range</Label>
                <div className="pt-2">
                  <Slider defaultValue={[500, 2000]} max={3000} min={0} step={50} />
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>$0</span>
                    <span>$3000</span>
                  </div>
                </div>
              </div>

              <div>
                <Label className="mb-3">Amenities</Label>
                <div className="space-y-3">
                  {['Parking', 'WiFi', 'Laundry', 'Pet-Friendly', 'Furnished', 'Utilities Included'].map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox id={amenity} />
                      <label htmlFor={amenity} className="text-sm cursor-pointer">
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="mb-3">Distance from Campus</Label>
                <Select>
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

              <Button className="w-full">Apply Filters</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
