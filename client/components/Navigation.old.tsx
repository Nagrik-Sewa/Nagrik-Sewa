import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  Menu, 
  X, 
  Globe, 
  User, 
  Search,
  Bell,
  MapPin,
  Phone
} from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState("English");

  const languages = [
    "English", "हिंदी", "বাংলা", "తెలుగు", "मराठी", "ગુજરાતી", 
    "ਪੰਜਾਬੀ", "ಕನ್ನಡ", "മലയാളം", "தமிழ்", "اردو"
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">न</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Nagrik Sewa</h1>
              <p className="text-xs text-gray-500">नागरिक सेवा</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-brand-600 font-medium">
              Home
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-brand-600 font-medium">
              Services
            </Link>
            <Link to="/workers" className="text-gray-700 hover:text-brand-600 font-medium">
              Find Workers
            </Link>
            <Link to="/join-worker" className="text-gray-700 hover:text-brand-600 font-medium">
              Join as Worker
            </Link>
            <Link to="/training" className="text-gray-700 hover:text-brand-600 font-medium">
              Training
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative group">
              <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                <Globe className="w-4 h-4" />
                <span className="text-sm">{language}</span>
              </Button>
              <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setLanguage(lang)}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Emergency Button */}
            <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
              <Phone className="w-4 h-4 mr-1" />
              SOS
            </Button>

            {/* Location */}
            <Button variant="ghost" size="sm" className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Delhi</span>
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-red-500 text-white">3</Badge>
            </Button>

            {/* Auth Buttons */}
            <Button variant="outline" size="sm">
              <User className="w-4 h-4 mr-2" />
              Login
            </Button>
            <Button size="sm" className="bg-brand-500 hover:bg-brand-600">
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 font-medium px-4 py-2">Home</Link>
              <Link to="/services" className="text-gray-700 font-medium px-4 py-2">Services</Link>
              <Link to="/workers" className="text-gray-700 font-medium px-4 py-2">Find Workers</Link>
              <Link to="/join-worker" className="text-gray-700 font-medium px-4 py-2">Join as Worker</Link>
              <Link to="/training" className="text-gray-700 font-medium px-4 py-2">Training</Link>
              
              <div className="px-4 pt-4 border-t border-gray-200">
                <div className="flex flex-col space-y-3">
                  <Button variant="outline" size="sm" className="text-red-600 border-red-200">
                    <Phone className="w-4 h-4 mr-2" />
                    Emergency SOS
                  </Button>
                  <Button variant="outline" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                  <Button size="sm" className="bg-brand-500 hover:bg-brand-600">
                    Sign Up
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
