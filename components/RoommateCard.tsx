import { Mail, Calendar, Briefcase, GraduationCap, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export interface Roommate {
  id: string;
  name: string;
  age: number;
  major: string;
  year: string;
  bio: string;
  budget: string;
  moveInDate: string;
  preferences: string[];
  interests: string[];
  verified: boolean;
  image: string;
}

interface RoommateCardProps {
  roommate: Roommate;
}

export function RoommateCard({ roommate }: RoommateCardProps) {
  const initials = roommate.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={roommate.image} alt={roommate.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3>{roommate.name}, {roommate.age}</h3>
              {roommate.verified && (
                <CheckCircle2 className="h-4 w-4 text-blue-600" />
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <GraduationCap className="h-4 w-4" />
              <span>{roommate.major} • {roommate.year}</span>
            </div>
          </div>
        </div>

        <p className="text-gray-700 mb-4">{roommate.bio}</p>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>Move-in: {roommate.moveInDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Briefcase className="h-4 w-4 text-gray-400" />
            <span>Budget: {roommate.budget}</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm mb-2">Preferences:</p>
          <div className="flex flex-wrap gap-2">
            {roommate.preferences.map((pref) => (
              <Badge key={pref} variant="secondary" className="text-xs">
                {pref}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm mb-2">Interests:</p>
          <div className="flex flex-wrap gap-2">
            {roommate.interests.map((interest) => (
              <Badge key={interest} variant="outline" className="text-xs">
                {interest}
              </Badge>
            ))}
          </div>
        </div>

        <Button className="w-full">
          <Mail className="h-4 w-4 mr-2" />
          Send Message
        </Button>
      </CardContent>
    </Card>
  );
}
