import { MapPin, DollarSign, Users, Wifi, Car, Home } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface Housing {
  id: string;
  title: string;
  address: string;
  price: string;
  bedrooms: string;
  distance: string;
  image: string;
  amenities: string[];
  type: string;
}

interface HousingCardProps {
  housing: Housing;
  onClick: () => void;
}

export function HousingCard({ housing, onClick }: HousingCardProps) {
  return (
    <Card className="overflow-hidden cursor-pointer transition-all hover:shadow-lg" onClick={onClick}>
      <div className="aspect-video relative overflow-hidden">
        <ImageWithFallback
          src={housing.image}
          alt={housing.title}
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-3 right-3 bg-white text-gray-900">
          {housing.type}
        </Badge>
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3>{housing.title}</h3>
          <span className="text-blue-600">${housing.price}/mo</span>
        </div>
        
        <div className="flex items-center gap-1 text-gray-600 text-sm mb-3">
          <MapPin className="h-4 w-4" />
          <span>{housing.address}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <span>{housing.bedrooms} bedrooms</span>
          <span>{housing.distance}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {housing.amenities.slice(0, 3).map((amenity) => (
            <Badge key={amenity} variant="outline" className="text-xs">
              {amenity}
            </Badge>
          ))}
        </div>

      </CardContent>
    </Card>
  );
}
