import { Home, Users, BookOpen, User } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Home className="h-6 w-6 text-blue-600" />
            <span className="text-xl">UCI Housing Hub</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => onTabChange('housing')}
              className={`flex items-center gap-2 transition-colors ${
                activeTab === 'housing' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Home className="h-4 w-4" />
              Housing
            </button>
            <button
              onClick={() => onTabChange('roommates')}
              className={`flex items-center gap-2 transition-colors ${
                activeTab === 'roommates' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Users className="h-4 w-4" />
              Find Roommates
            </button>
            <button
              onClick={() => onTabChange('guide')}
              className={`flex items-center gap-2 transition-colors ${
                activeTab === 'guide' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              Housing Guide
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button size="sm">Get Started</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
