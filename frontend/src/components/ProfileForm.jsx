import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";
import { Badge } from "./ui/badge";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

export function ProfileForm({ open, onClose, onComplete }) {
  const [formData, setFormData] = useState({
    name: "",
    year: "",
    sleepSchedule: "",
    cleanliness: [3],
    interests: [],
  });

  const interestOptions = [
    "Coding",
    "Gaming",
    "Sports",
    "Music",
    "Cooking",
    "Reading",
    "Hiking",
    "Photography",
    "Art",
    "Gym",
    "Yoga",
    "Movies",
    "Travel",
    "Boba runs",
    "Beach activities",
    "Study groups",
  ];

  const handleInterestToggle = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile data:", formData);
    onComplete(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Complete Your Profile</DialogTitle>
          <DialogDescription>
            Help us find your perfect roommate match by completing your profile
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          {/* Year */}
          <div className="space-y-2">
            <Label htmlFor="year">Academic Year *</Label>
            <Select
              value={formData.year}
              onValueChange={(value) =>
                setFormData({ ...formData, year: value })
              }
              required
            >
              <SelectTrigger id="year">
                <SelectValue placeholder="Select your year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Freshman">Freshman</SelectItem>
                <SelectItem value="Sophomore">Sophomore</SelectItem>
                <SelectItem value="Junior">Junior</SelectItem>
                <SelectItem value="Senior">Senior</SelectItem>
                <SelectItem value="Graduate">Graduate Student</SelectItem>
                <SelectItem value="Transfer">Transfer Student</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sleep Schedule */}
          <div className="space-y-3">
            <Label>Sleep Schedule *</Label>
            <RadioGroup
              value={formData.sleepSchedule}
              onValueChange={(value) =>
                setFormData({ ...formData, sleepSchedule: value })
              }
              required
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="early-bird" id="early-bird" />
                <Label htmlFor="early-bird" className="cursor-pointer">
                  Early Bird (Sleep before 11 PM, wake up before 7 AM)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="moderate" id="moderate" />
                <Label htmlFor="moderate" className="cursor-pointer">
                  Moderate (Sleep 11 PM - 1 AM, wake up 7-9 AM)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="night-owl" id="night-owl" />
                <Label htmlFor="night-owl" className="cursor-pointer">
                  Night Owl (Sleep after 1 AM, wake up after 9 AM)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="flexible" id="flexible" />
                <Label htmlFor="flexible" className="cursor-pointer">
                  Flexible (Varies day to day)
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Cleanliness */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Cleanliness Level *</Label>
              <Badge variant="secondary" className="text-sm">
                {formData.cleanliness[0]} / 5
              </Badge>
            </div>
            <div className="px-2">
              <Slider
                value={formData.cleanliness}
                onValueChange={(value) =>
                  setFormData({ ...formData, cleanliness: value })
                }
                min={1}
                max={5}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Relaxed</span>
                <span>Moderate</span>
                <span>Very Clean</span>
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-3">
            <Label>Interests (Select all that apply)</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {interestOptions.map((interest) => (
                <div key={interest} className="flex items-center space-x-2">
                  <Checkbox
                    id={interest}
                    checked={formData.interests.includes(interest)}
                    onCheckedChange={() => handleInterestToggle(interest)}
                  />
                  <Label
                    htmlFor={interest}
                    className="text-sm cursor-pointer"
                  >
                    {interest}
                  </Label>
                </div>
              ))}
            </div>
            {formData.interests.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.interests.map((interest) => (
                  <Badge key={interest} variant="secondary">
                    {interest}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex flex-col gap-3 pt-4">
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={
                !formData.name ||
                !formData.year ||
                !formData.sleepSchedule
              }
            >
              Find Matches
            </Button>
            <p className="text-xs text-gray-500 text-center">
              You can update your profile anytime from your account settings
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
