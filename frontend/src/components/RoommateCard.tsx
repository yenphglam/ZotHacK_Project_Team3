import { Mail, Calendar, Briefcase, GraduationCap, Home, Moon, Sparkles } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useState } from "react";
import { ChatDialog } from "./ChatDialog";

export interface Roommate {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  major: string;
  year: string;
  bio: string;
  budgetMin: number;
  budgetMax: number;
  moveInDate: string;
  preferences: {
    cleanOrganized: boolean;
    quietHours: boolean;
    nonSmoker: boolean;
    petsAllowed: boolean;
    guestsOk: boolean;
  };
  interests: string[];
  sleepSchedule: string;
  cleanliness: number[];
  matchScore?: number;
  matchReasons?: string[];
  sharedInterests?: string[];
}

interface RoommateCardProps {
  roommate: Roommate;
}

export function RoommateCard({ roommate }: RoommateCardProps) {
  const [chatOpen, setChatOpen] = useState(false);
  
  const initials = roommate.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  // Convert preferences object to array of strings
  const preferencesList = Object.entries(roommate.preferences || {})
    .filter(([_, value]) => value)
    .map(([key, _]) => {
      const labels: Record<string, string> = {
        cleanOrganized: "Clean & Organized",
        quietHours: "Quiet Hours",
        nonSmoker: "Non-Smoker",
        petsAllowed: "Pets Allowed",
        guestsOk: "Guests Okay"
      };
      return labels[key] || key;
    });

  // Format sleep schedule
  const sleepScheduleLabels: Record<string, string> = {
    "early-bird": "Early Bird",
    "moderate": "Moderate",
    "night-owl": "Night Owl",
    "flexible": "Flexible"
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          {/* Header with Avatar and Basic Info */}
          <div className="flex items-start gap-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={roommate.photoURL} alt={roommate.name} />
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold">{roommate.name}</h3>
                {roommate.matchScore !== undefined && roommate.matchScore > 50 && (
                  <Badge variant="default" className="bg-green-500">
                    {roommate.matchScore}% Match
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <GraduationCap className="h-4 w-4" />
                <span>{roommate.major} • {roommate.year}</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <p className="text-gray-700 mb-4 text-sm">{roommate.bio}</p>

          {/* Match Reasons (if available) */}
          {roommate.matchReasons && roommate.matchReasons.length > 0 && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-900 mb-2">Why you match:</p>
              <div className="flex flex-wrap gap-2">
                {roommate.matchReasons.map((reason, index) => (
                  <Badge key={index} variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                    {reason}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Details */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span>Move-in: {roommate.moveInDate}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Briefcase className="h-4 w-4 text-gray-400" />
              <span>Budget: ${roommate.budgetMin} - ${roommate.budgetMax}/month</span>
            </div>
          </div>

          {/* Preferences */}
          {preferencesList.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Preferences:</p>
              <div className="flex flex-wrap gap-2">
                {preferencesList.map((pref) => (
                  <Badge key={pref} variant="secondary" className="text-xs">
                    {pref}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Interests */}
          {roommate.interests && roommate.interests.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Interests:</p>
              <div className="flex flex-wrap gap-2">
                {roommate.interests.map((interest) => (
                  <Badge key={interest} variant="outline" className="text-xs">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Shared Interests */}
          {roommate.sharedInterests && roommate.sharedInterests.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium mb-2 text-green-700">Shared Interests:</p>
              <div className="flex flex-wrap gap-2">
                {roommate.sharedInterests.map((interest) => (
                  <Badge key={interest} variant="outline" className="text-xs border-green-500 text-green-700">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Send Message Button */}
          <Button className="w-full" onClick={() => setChatOpen(true)}>
            <Mail className="h-4 w-4 mr-2" />
            Send Message
          </Button>
        </CardContent>
      </Card>
      
      <ChatDialog
        roommate={roommate}
        open={chatOpen}
        onClose={() => setChatOpen(false)}
      />
    </>
  );
}
