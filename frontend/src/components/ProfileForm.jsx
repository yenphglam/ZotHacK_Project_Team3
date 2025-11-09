import { useState, useEffect } from "react";

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
import { saveUserProfile, getUserProfile } from "../lib/firebase";
import { auth } from "../lib/firebase";

export function ProfileForm({ open, onClose, onComplete }) {
  const [formData, setFormData] = useState({
    name: "",
    year: "",
    sleepSchedule: "",
    cleanliness: [3],
    interests: [],
    major: "",
    bio: "",
    moveInDate: "",
    budgetMin: "",
    budgetMax: "",
    preferences: {
      cleanOrganized: false,
      quietHours: false,
      nonSmoker: false,
      petsAllowed: false,
      guestsOk: false,
    }
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [hasExistingProfile, setHasExistingProfile] = useState(false);

  // Load existing profile data when dialog opens
useEffect(() => {
  const loadProfile = async () => {
    if (!open) return; // Only run when dialog is open
    
    setLoadingProfile(true);
    console.log("🔄 Loading profile data...");
    
    try {
      const user = auth.currentUser;
      
      if (!user) {
        console.log("❌ No user signed in");
        setLoadingProfile(false);
        return;
      }

      console.log("👤 Loading profile for:", user.email);
      const profileResult = await getUserProfile(user.uid);
      
      if (profileResult.success && profileResult.data) {
        const data = profileResult.data;
        console.log("✅ Profile loaded:", data);
        
        setHasExistingProfile(true);
        
        // Fill form with existing data
        setFormData({
          name: data.name || "",
          year: data.year || "",
          major: data.major || "",
          bio: data.bio || "",
          sleepSchedule: data.sleepSchedule || "",
          cleanliness: data.cleanliness || [3],
          interests: data.interests || [],
          moveInDate: data.moveInDate || "",
          budgetMin: data.budgetMin?.toString() || "",
          budgetMax: data.budgetMax?.toString() || "",
          preferences: data.preferences || {
            cleanOrganized: false,
            quietHours: false,
            nonSmoker: false,
            petsAllowed: false,
            guestsOk: false,
          },
        });
      } else {
        console.log("ℹ️ No existing profile found");
        setHasExistingProfile(false);
        
        // Reset form to empty for new users
        setFormData({
          name: "",
          year: "",
          major: "",
          bio: "",
          sleepSchedule: "",
          cleanliness: [3],
          interests: [],
          moveInDate: "",
          budgetMin: "",
          budgetMax: "",
          preferences: {
            cleanOrganized: false,
            quietHours: false,
            nonSmoker: false,
            petsAllowed: false,
            guestsOk: false,
          },
        });
      }
    } catch (err) {
      console.error("❌ Error loading profile:", err);
      setError("Failed to load profile data");
    } finally {
      setLoadingProfile(false);
    }
  };

  loadProfile();
}, [open]); // Run whenever dialog opens/closes

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
        // Basic info
        name: formData.name,
        email: user.email,
        photoURL: user.photoURL,
        
        // Academic info
        year: formData.year,
        major: formData.major,
        
        // About
        bio: formData.bio,
        
        // Lifestyle
        sleepSchedule: formData.sleepSchedule,
        cleanliness: formData.cleanliness,
        interests: formData.interests,
        
        // Housing preferences
        moveInDate: formData.moveInDate,
        budgetMin: parseInt(formData.budgetMin),
        budgetMax: parseInt(formData.budgetMax),
        preferences: formData.preferences,
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
      <DialogContent className="!fixed sm:max-w-[600px] max-h-[90vh] overflow-y-auto !left-[50%] !top-[50%] !-translate-x-1/2 !-translate-y-1/2 !z-[100]">
        <DialogHeader>
          <DialogTitle>
            {hasExistingProfile ? "Edit Your Profile" : "Complete Your Profile"}
          </DialogTitle>
          <DialogDescription>
            Help us find your perfect roommate match by completing your profile
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Loading overlay while fetching profile */}
          {loadingProfile && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10 rounded-lg">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Loading profile...</p>
              </div>
            </div>
          )}

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

                    {/* Major */}
          <div className="space-y-2">
            <Label htmlFor="major">Major *</Label>
            <Input
              id="major"
              placeholder="e.g., Computer Science, Biology, Business"
              value={formData.major}
              onChange={(e) =>
                setFormData({ ...formData, major: e.target.value })
              }
              required
              disabled={loading}
            />
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">About Me *</Label>
            <textarea
              id="bio"
              placeholder="Tell potential roommates about yourself... (e.g., I'm a CS major looking for a clean, organized roommate near campus. I'm friendly but appreciate personal space, especially during finals.)"
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              required
              disabled={loading}
              className="w-full min-h-[100px] px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={500}
            />
            <p className="text-xs text-gray-500">
              {formData.bio.length}/500 characters
            </p>
          </div>

          {/* Move-in Date */}
          <div className="space-y-2">
            <Label htmlFor="moveInDate">Move-in Date *</Label>
            <Select
              value={formData.moveInDate}
              onValueChange={(value) =>
                setFormData({ ...formData, moveInDate: value })
              }
              required
              disabled={loading}
            >
              <SelectTrigger id="moveInDate">
                <SelectValue placeholder="Select move-in date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="June 2025">June 2025</SelectItem>
                <SelectItem value="July 2025">July 2025</SelectItem>
                <SelectItem value="August 2025">August 2025</SelectItem>
                <SelectItem value="September 2025">September 2025</SelectItem>
                <SelectItem value="October 2025">October 2025</SelectItem>
                <SelectItem value="November 2025">November 2025</SelectItem>
                <SelectItem value="December 2025">December 2025</SelectItem>
                <SelectItem value="January 2026">January 2026</SelectItem>
                <SelectItem value="February 2026">February 2026</SelectItem>
                <SelectItem value="March 2026">March 2026</SelectItem>
                <SelectItem value="April 2026">April 2026</SelectItem>
                <SelectItem value="May 2026">May 2026</SelectItem>
                <SelectItem value="Flexible">Flexible</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Budget Range */}
          <div className="space-y-2">
            <Label>Monthly Budget Range *</Label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="budgetMin" className="text-xs text-gray-500">
                  Min ($)
                </Label>
                <Input
                  id="budgetMin"
                  type="number"
                  placeholder="Min"
                  value={formData.budgetMin}
                  onChange={(e) =>
                    setFormData({ ...formData, budgetMin: e.target.value })
                  }
                  required
                  disabled={loading}
                  min="0"
                  step="50"
                />
              </div>
              <div>
                <Label htmlFor="budgetMax" className="text-xs text-gray-500">
                  Max ($)
                </Label>
                <Input
                  id="budgetMax"
                  type="number"
                  placeholder="Max"
                  value={formData.budgetMax}
                  onChange={(e) =>
                    setFormData({ ...formData, budgetMax: e.target.value })
                  }
                  required
                  disabled={loading}
                  min="0"
                  step="50"
                />
              </div>
            </div>
            {formData.budgetMin && formData.budgetMax && (
              <p className="text-sm text-gray-600">
                Budget: ${formData.budgetMin} - ${formData.budgetMax}/month
              </p>
            )}
          </div>

          {/* Preferences */}
          <div className="space-y-3">
            <Label>Roommate Preferences *</Label>
            <div className="space-y-3 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="cleanOrganized"
                  checked={formData.preferences.cleanOrganized}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      preferences: {
                        ...formData.preferences,
                        cleanOrganized: checked,
                      },
                    })
                  }
                  disabled={loading}
                />
                <Label htmlFor="cleanOrganized" className="cursor-pointer">
                  Clean & Organized
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="quietHours"
                  checked={formData.preferences.quietHours}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      preferences: {
                        ...formData.preferences,
                        quietHours: checked,
                      },
                    })
                  }
                  disabled={loading}
                />
                <Label htmlFor="quietHours" className="cursor-pointer">
                  Quiet Hours (especially during study/finals)
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="nonSmoker"
                  checked={formData.preferences.nonSmoker}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      preferences: {
                        ...formData.preferences,
                        nonSmoker: checked,
                      },
                    })
                  }
                  disabled={loading}
                />
                <Label htmlFor="nonSmoker" className="cursor-pointer">
                  Non-Smoker
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="petsAllowed"
                  checked={formData.preferences.petsAllowed}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      preferences: {
                        ...formData.preferences,
                        petsAllowed: checked,
                      },
                    })
                  }
                  disabled={loading}
                />
                <Label htmlFor="petsAllowed" className="cursor-pointer">
                  Pets Allowed
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="guestsOk"
                  checked={formData.preferences.guestsOk}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      preferences: {
                        ...formData.preferences,
                        guestsOk: checked,
                      },
                    })
                  }
                  disabled={loading}
                />
                <Label htmlFor="guestsOk" className="cursor-pointer">
                  Guests Okay
                </Label>
              </div>
            </div>
            
            {/* Show selected preferences */}
            {Object.entries(formData.preferences).some(([_, value]) => value) && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.preferences.cleanOrganized && (
                  <Badge variant="secondary">Clean & Organized</Badge>
                )}
                {formData.preferences.quietHours && (
                  <Badge variant="secondary">Quiet Hours</Badge>
                )}
                {formData.preferences.nonSmoker && (
                  <Badge variant="secondary">Non-Smoker</Badge>
                )}
                {formData.preferences.petsAllowed && (
                  <Badge variant="secondary">Pets Allowed</Badge>
                )}
                {formData.preferences.guestsOk && (
                  <Badge variant="secondary">Guests Okay</Badge>
                )}
              </div>
            )}
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
                !formData.major ||
                !formData.bio ||
                !formData.sleepSchedule ||
                !formData.moveInDate ||
                !formData.budgetMin ||
                !formData.budgetMax ||
                loading ||
                loadingProfile
              }
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving Profile...
                </>
              ) : loadingProfile ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : hasExistingProfile ? (
                "Update Profile"
              ) : (
                "Create Profile"
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
