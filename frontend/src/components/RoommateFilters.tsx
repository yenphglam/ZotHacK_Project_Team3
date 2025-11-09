import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Slider } from "./ui/slider";
import { useState } from "react";

interface RoommateFiltersProps {
  onFilterChange: (filters: any) => void;
}

export function RoommateFilters({ onFilterChange }: RoommateFiltersProps) {
  // State for all filters
  const [searchQuery, setSearchQuery] = useState("");
  const [year, setYear] = useState("all");
  const [budgetRange, setBudgetRange] = useState([0, 2000]);
  const [sleepSchedule, setSleepSchedule] = useState("any");
  const [cleanliness, setCleanliness] = useState([1, 5]);
  const [moveInDate, setMoveInDate] = useState("any");
  const [preferences, setPreferences] = useState<string[]>([]);
  const [minMatchScore, setMinMatchScore] = useState(0);

  // Handle preference toggle
  const handlePreferenceToggle = (preference: string) => {
    setPreferences(prev => 
      prev.includes(preference) 
        ? prev.filter(p => p !== preference)
        : [...prev, preference]
    );
  };

  // Apply filters
  const applyFilters = () => {
    onFilterChange({
      searchQuery,
      year,
      budgetRange,
      sleepSchedule,
      cleanliness,
      moveInDate,
      preferences,
      minMatchScore
    });
  };

  // Reset filters
  const resetFilters = () => {
    setSearchQuery("");
    setYear("all");
    setBudgetRange([0, 2000]);
    setSleepSchedule("any");
    setCleanliness([1, 5]);
    setMoveInDate("any");
    setPreferences([]);
    setMinMatchScore(0);
    onFilterChange({
      searchQuery: "",
      year: "all",
      budgetRange: [0, 2000],
      sleepSchedule: "any",
      cleanliness: [1, 5],
      moveInDate: "any",
      preferences: [],
      minMatchScore: 0
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
              placeholder="Search by name, major, interests..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                applyFilters();
              }}
            />
          </div>
        </div>

        {/* Year Filter */}
        <Select value={year} onValueChange={(value) => {
          setYear(value);
          applyFilters();
        }}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent position="popper" className="z-[10000]">
            <SelectItem value="all">All Years</SelectItem>
            <SelectItem value="Freshman">Freshman</SelectItem>
            <SelectItem value="Sophomore">Sophomore</SelectItem>
            <SelectItem value="Junior">Junior</SelectItem>
            <SelectItem value="Senior">Senior</SelectItem>
            <SelectItem value="Graduate">Graduate</SelectItem>
            <SelectItem value="Transfer">Transfer</SelectItem>
          </SelectContent>
        </Select>

        {/* Sleep Schedule Filter */}
        <Select value={sleepSchedule} onValueChange={(value) => {
          setSleepSchedule(value);
          applyFilters();
        }}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Sleep Schedule" />
          </SelectTrigger>
          <SelectContent position="popper" className="z-[10000]">
            <SelectItem value="any">Any Schedule</SelectItem>
            <SelectItem value="early-bird">Early Bird</SelectItem>
            <SelectItem value="moderate">Moderate</SelectItem>
            <SelectItem value="night-owl">Night Owl</SelectItem>
            <SelectItem value="flexible">Flexible</SelectItem>
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
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filter Preferences</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              {/* Budget Range */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Budget Range</Label>
                <div className="pt-2 px-2">
                  <Slider 
                    value={budgetRange}
                    onValueChange={setBudgetRange}
                    max={2000} 
                    min={0} 
                    step={50} 
                  />
                  <div className="flex justify-between mt-3 text-sm text-gray-600">
                    <span>${budgetRange[0]}</span>
                    <span>${budgetRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Cleanliness Level */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Cleanliness Level</Label>
                <div className="pt-2 px-2">
                  <Slider 
                    value={cleanliness}
                    onValueChange={setCleanliness}
                    max={5} 
                    min={1} 
                    step={1} 
                  />
                  <div className="flex justify-between mt-3 text-sm text-gray-600">
                    <span>{cleanliness[0]} (Relaxed)</span>
                    <span>{cleanliness[1]} (Very Clean)</span>
                  </div>
                </div>
              </div>

              {/* Match Score */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">
                  Minimum Match Score: {minMatchScore}%
                </Label>
                <div className="pt-2 px-2">
                  <Slider 
                    value={[minMatchScore]}
                    onValueChange={(value) => setMinMatchScore(value[0])}
                    max={100} 
                    min={0} 
                    step={5} 
                  />
                </div>
              </div>

              {/* Lifestyle Preferences */}
              <div>
                <Label className="mb-3 text-base font-semibold">Lifestyle Preferences</Label>
                <div className="space-y-3 mt-3">
                  {['Clean & Organized', 'Quiet Hours', 'Non-Smoker', 'Pets Allowed', 'Guests Okay'].map((pref) => (
                    <div key={pref} className="flex items-center space-x-2">
                      <Checkbox 
                        id={pref}
                        checked={preferences.includes(pref)}
                        onCheckedChange={() => handlePreferenceToggle(pref)}
                      />
                      <label htmlFor={pref} className="text-sm cursor-pointer">
                        {pref}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Move-in Timeline */}
              <div>
                <Label className="mb-3 text-base font-semibold">Move-in Timeline</Label>
                <Select value={moveInDate} onValueChange={setMoveInDate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any time" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="z-[10000]">
                    <SelectItem value="any">Any time</SelectItem>
                    <SelectItem value="June 2025">June 2025</SelectItem>
                    <SelectItem value="July 2025">July 2025</SelectItem>
                    <SelectItem value="August 2025">August 2025</SelectItem>
                    <SelectItem value="September 2025">September 2025</SelectItem>
                    <SelectItem value="Flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Buttons */}
              <div className="space-y-2 pt-4">
                <Button variant="outline" className="w-full" onClick={resetFilters}>
                  Reset Filters
                </Button>
                <Button className="w-full" onClick={applyFilters}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filters Display */}
      {(searchQuery || year !== 'all' || sleepSchedule !== 'any' || preferences.length > 0 || minMatchScore > 0) && (
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="text-sm text-gray-600">Active filters:</span>
          
          {searchQuery && (
            <Badge variant="secondary">
              Search: {searchQuery}
              <button 
                onClick={() => {
                  setSearchQuery("");
                  applyFilters();
                }}
                className="ml-2"
              >
                ×
              </button>
            </Badge>
          )}
          
          {year !== 'all' && (
            <Badge variant="secondary">
              {year}
              <button 
                onClick={() => {
                  setYear("all");
                  applyFilters();
                }}
                className="ml-2"
              >
                ×
              </button>
            </Badge>
          )}
          
          {sleepSchedule !== 'any' && (
            <Badge variant="secondary">
              {sleepSchedule.replace('-', ' ')}
              <button 
                onClick={() => {
                  setSleepSchedule("any");
                  applyFilters();
                }}
                className="ml-2"
              >
                ×
              </button>
            </Badge>
          )}

          {minMatchScore > 0 && (
            <Badge variant="secondary">
              Match: {minMatchScore}%+
              <button 
                onClick={() => {
                  setMinMatchScore(0);
                  applyFilters();
                }}
                className="ml-2"
              >
                ×
              </button>
            </Badge>
          )}
          
          {preferences.map(pref => (
            <Badge key={pref} variant="secondary">
              {pref}
              <button 
                onClick={() => {
                  handlePreferenceToggle(pref);
                  applyFilters();
                }}
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
