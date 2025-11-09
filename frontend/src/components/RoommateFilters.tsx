import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

interface RoommateFiltersProps {
  onFilterChange: (filters: any) => void;
}

export function RoommateFilters({ onFilterChange }: RoommateFiltersProps) {
  return (
    <div className="bg-white border rounded-lg p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by major, interests..."
              className="pl-10"
            />
          </div>
        </div>

        <Select>
          <SelectTrigger className="w-full md:w-48 ml-2 mb-3">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            <SelectItem value="freshman">Freshman</SelectItem>
            <SelectItem value="sophomore">Sophomore</SelectItem>
            <SelectItem value="junior">Junior</SelectItem>
            <SelectItem value="senior">Senior</SelectItem>
            <SelectItem value="grad">Graduate</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Budget" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any Budget</SelectItem>
            <SelectItem value="low">Under $600</SelectItem>
            <SelectItem value="mid">$600-$1000</SelectItem>
            <SelectItem value="high">$1000+</SelectItem>
          </SelectContent>
        </Select>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </SheetTrigger>
          <SheetContent className="ml-2 mb-3">
            <SheetHeader>
              <SheetTitle>Filter Preferences</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              <div>
                <Label className="mb-3 ml-2">Lifestyle Preferences</Label>
                <div className="space-y-3 ml-2">
                  {['Clean & Organized', 'Quiet Hours', 'Social & Friendly', 'Pet-Friendly', 'Non-Smoker', 'Early Riser'].map((pref) => (
                    <div key={pref} className="flex items-center space-x-2">
                      <Checkbox id={pref} />
                      <label htmlFor={pref} className="text-sm cursor-pointer">
                        {pref}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="mb-3 ml-2">Move-in Timeline</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue className= "ml-2 mb-3" placeholder="Any time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className= "ml-2 mb-3" value="any">Any time</SelectItem>
                    <SelectItem className= "ml-2 mb-3" value="asap">ASAP</SelectItem>
                    <SelectItem className= "ml-2 mb-3" value="month">Within 1 month</SelectItem>
                    <SelectItem className= "ml-2 mb-3" value="semester">Next semester</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-3 ml-2">Gender Preference</Label>
                <Select>
                  <SelectTrigger className="mb-3 ml-2">
                    <SelectValue placeholder="No preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">No preference</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="ml-2 mb-3w-600">Apply Filters</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
