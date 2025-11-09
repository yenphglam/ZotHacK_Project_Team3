import { MonitorCog, Turntable, EvCharger, Bike, Bone, CigaretteOff, WavesLadder, LandPlot, Bath,SquareLibrary, BookOpenText,LampDesk, Dumbbell,Beef, Mic, X, MapPin, DollarSign, Calendar, Home, Wifi, Car, WashingMachine, PawPrint, Zap, Droplet } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Housing } from "./HousingCard";

interface HousingDetailProps {
  housing: Housing | null;
  open: boolean;
  onClose: () => void;
}

export function HousingDetail({ housing, open, onClose }: HousingDetailProps) {
  if (!housing) return null;

  const amenityIcons: Record<string, any> = {
    "Parking": Car,
    "Wifi": Wifi,
    "Laundry": WashingMachine,
    "Pet-Friendly": PawPrint,
    "Utilities Included": Zap,
    "Clubhouse": Mic,
    "BBQ area": Beef,
    "Fitness center": Dumbbell,
    "Workspace": LampDesk,
    "Study Rooms": BookOpenText,
    "Study Lounges": SquareLibrary,
    "Pool": WavesLadder,
    "Private Bathrooms": Bath,
    "Gym Access": LandPlot,
    "Smoke-free": CigaretteOff,
    "Pet-friendly": Bone,
    "Yoga room": Bike,
    "EV charging": EvCharger,
    "Rooftop deck": Turntable,
    "Controlled access": MonitorCog
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-[1500px] max-h-[100vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{housing.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="aspect-video relative overflow-hidden rounded-lg">
            <ImageWithFallback
              src={housing.image}
              alt={housing.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-bold">Details</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-700">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span>{housing.price} per month</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Home className="h-4 w-4 text-gray-400" />
                    <span>{housing.bedrooms} bedrooms</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{housing.address}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-bold">Property Type</h3>
                <Badge>{housing.type}</Badge>
              </div>

              <div>
                <h3 className="mb-3 font-bold">Amenities</h3>
                <div className="grid grid-cols-2 gap-3">
                  {housing.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity] || Home;
                    return (
                      <div key={amenity} className="flex items-center gap-2 text-sm">
                        <Icon className="h-4 w-4 text-blue-600" />
                        <span>{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-bold">Description</h3>
                <p className="text-gray-700">
                  This {housing.type} is located {housing.distance} from campus, making it perfect for students. 
                  The property features {housing.bedrooms} spacious bedrooms. 
                  With amenities including {housing.amenities.slice(0, 3).join(', ')}, you'll have everything you need 
                  for a comfortable college living experience.
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-bold">Location</h3>
                <p className="text-gray-700 mb-2">
                  {housing.distance === "on campus"
                  ? "On Campus"
                  : `${housing.distance}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
