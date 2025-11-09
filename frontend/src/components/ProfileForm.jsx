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
import { Loader2 } from "lucide-react";
import { saveUserProfile } from "../lib/firebase";
import { auth } from "../lib/firebase";

export function ProfileForm({ open, onClose, onComplete }) {
  const [formData, setFormData] = useState({
    name: "",
    year: "",
    sleepSchedule: "",
    cleanliness: [3],
    interests: [],
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Get current user
      const user = auth.currentUser;
      
      if (!user) {
        throw new Error("You must be signed in to save your profile");
      }

      // Prepare data to save
      const profileData = {
        name: formData.name,
        email: user.email,
        photoURL: user.photoURL,
        year: formData.year,
        sleepSchedule: formData.sleepSchedule,
        cleanliness: formData.cleanliness,
        interests: formData.interests,
      };

      // Save to Firestore
      await saveUserProfile(user.uid, profileData);

      console.log("Profile saved successfully!");
      
      // Call the onComplete callback
      onComplete(profileData);
      
      // Close the dialog
      onClose();
    } catch (err) {
      console.error("Error saving profile:", err);
      setError(err.message || "Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
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
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
                disabled={loading}
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
                    disabled={loading}
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
                !formData.sleepSchedule ||
                loading
              }
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving Profile...
                </>
              ) : (
                "Find Matches"
              )}
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
