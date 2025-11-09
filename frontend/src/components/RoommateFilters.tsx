import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Slider } from "./ui/slider";
import { useState, useEffect } from "react";

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

  // Auto-apply filters whenever ANY state changes
  useEffect(() => {
    console.log('🔄 Filter changed, applying...', {
      searchQuery,
      year,
      budgetRange,
      sleepSchedule,
      cleanliness,
      moveInDate,
      preferences,
      minMatchScore
    });

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
  }, [searchQuery, year, budgetRange, sleepSchedule, cleanliness, moveInDate, preferences, minMatchScore]);

  // Handle preference toggle
  const handlePreferenceToggle = (preference: string) => {
    setPreferences(prev => 
      prev.includes(preference) 
        ? prev.filter(p => p !== preference)
        : [...prev, preference]
    );
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
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Year Filter */}
        <Select value={year} onValueChange={setYear}>
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
        <Select value={sleepSchedule} onValueChange={setSleepSchedule}>
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
              {(preferences.length > 0 || minMatchScore > 0 || budgetRange[0] !== 0 || budgetRange[1] !== 2000 || cleanliness[0] !== 1 || cleanliness[1] !== 5 || moveInDate !== 'any') && (
                <span className="ml-2 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {preferences.length + (minMatchScore > 0 ? 1 : 0) + (budgetRange[0] !== 0 || budgetRange[1] !== 2000 ? 1 : 0) + (cleanliness[0] !== 1 || cleanliness[1] !== 5 ? 1 : 0) + (moveInDate !== 'any' ? 1 : 0)}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto w-full sm:max-w-md p-0">
            <div className="p-6">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-xl">Filter Preferences</SheetTitle>
              </SheetHeader>
              <div className="space-y-8">
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
                      <span>${budgetRange[0]}/mo</span>
                      <span>${budgetRange[1]}/mo</span>
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
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Lifestyle Preferences</Label>
                  <div className="space-y-3">
                    {['Clean & Organized', 'Quiet Hours', 'Non-Smoker', 'Pets Allowed', 'Guests Okay'].map((pref) => (
                      <div key={pref} className="flex items-center space-x-3">
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
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Move-in Timeline</Label>
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

                {/* Reset Button */}
                <div className="pt-4">
                  <Button variant="outline" className="w-full" onClick={resetFilters}>
                    Reset All Filters
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filters Display */}
      {(searchQuery || year !== 'all' || sleepSchedule !== 'any' || preferences.length > 0 || minMatchScore > 0 || budgetRange[0] !== 0 || budgetRange[1] !== 2000 || cleanliness[0] !== 1 || cleanliness[1] !== 5 || moveInDate !== 'any') && (
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
          
          {year !== 'all' && (
            <Badge variant="secondary">
              {year}
              <button 
                onClick={() => setYear("all")}
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
                onClick={() => setSleepSchedule("any")}
                className="ml-2"
              >
                ×
              </button>
            </Badge>
          )}

          {(budgetRange[0] !== 0 || budgetRange[1] !== 2000) && (
            <Badge variant="secondary">
              Budget: ${budgetRange[0]}-${budgetRange[1]}
              <button 
                onClick={() => setBudgetRange([0, 2000])}
                className="ml-2"
              >
                ×
              </button>
            </Badge>
          )}

          {(cleanliness[0] !== 1 || cleanliness[1] !== 5) && (
            <Badge variant="secondary">
              Cleanliness: {cleanliness[0]}-{cleanliness[1]}
              <button 
                onClick={() => setCleanliness([1, 5])}
                className="ml-2"
              >
                ×
              </button>
            </Badge>
          )}

          {moveInDate !== 'any' && (
            <Badge variant="secondary">
              Move-in: {moveInDate}
              <button 
                onClick={() => setMoveInDate("any")}
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
                onClick={() => setMinMatchScore(0)}
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
                onClick={() => handlePreferenceToggle(pref)}
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
