import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  User, 
  Settings, 
  LogOut, 
  Calendar,
  Bell,
  Menu,
  X,
  Home as HomeIcon,
  ChevronDown,
  Briefcase,
  Users,
  FileText
} from "lucide-react";
import { useState } from "react";
import { LanguageSelector } from "@/components/LanguageSelector";
import { LocationSelector } from "@/components/LocationSelector";

export function Navigation() {
  const { user, isAuthenticated, logout } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  interface NavLink {
    href: string;
    label: string;
    icon?: any;
    dropdown?: { href: string; label: string }[];
  }

  const navLinks: NavLink[] = [
    { href: "/", label: t("navigation.home"), icon: HomeIcon },
    { 
      href: "/workers", 
      label: "For Workers",
      icon: Users,
      dropdown: [
        { href: "/join-as-worker", label: "Join as Worker" },
        { href: "/skill-training", label: "Skill Training" },
        { href: "/resume-builder", label: "Resume Builder" },
        { href: "/get-verified", label: "Get Verified" },
        { href: "/worker-support", label: "Worker Support" }
      ]
    },
    { 
      href: "/services", 
      label: "For Customers",
      icon: Briefcase,
      dropdown: [
        { href: "/services", label: "All Services" },
        { href: "/services/home", label: "Home Services" },
        { href: "/services/construction", label: "Construction" },
        { href: "/services/electrical", label: "Electrical" },
        { href: "/services/plumbing", label: "Plumbing" },
        { href: "/services/cleaning", label: "Cleaning" },
        { href: "/support", label: "Customer Support" }
      ]
    }
  ];

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/logo-hindi.svg" 
              alt="Nagrik Sewa" 
              className="h-12 w-12"
            />
            <div className="flex flex-col">
              <span className="font-bold text-lg text-green-600">Nagrik Sewa</span>
              <span className="text-xs text-gray-500 -mt-1">AI-Powered Services</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group">
                {link.dropdown ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary ${
                        isActivePath(link.href) || link.dropdown.some(subLink => isActivePath(subLink.href))
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}>
                        <span>{link.label}</span>
                        <ChevronDown className="h-3 w-3" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48">
                      {link.dropdown.map((subLink) => (
                        <DropdownMenuItem key={subLink.href} asChild>
                          <Link to={subLink.href} className="w-full">
                            {subLink.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    to={link.href}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActivePath(link.href)
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language and Location Selectors */}
            <div className="flex items-center space-x-3 border-r pr-4">
              <LanguageSelector variant="compact" />
              <LocationSelector variant="compact" showDistrict={true} />
            </div>

            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/bookings">
                    <Calendar className="h-4 w-4 mr-2" />
                    {t("navigation.bookings")}
                  </Link>
                </Button>
                
                <Button variant="ghost" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.avatar} alt={user?.firstName} />
                        <AvatarFallback>
                          {user?.firstName?.[0]}{user?.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">
                        <User className="mr-2 h-4 w-4" />
                        <span>{t("navigation.dashboard")}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>{t("navigation.profile")}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/bookings">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>{t("navigation.bookings")}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/resume-builder">
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Resume Builder</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{t("navigation.logout")}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">{t("navigation.login")}</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">{t("navigation.register")}</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-background py-4">
            <div className="flex flex-col space-y-3">
              {/* Mobile Language and Location Selectors */}
              <div className="border-b pb-3 mb-3 space-y-3">
                <div className="px-2">
                  <p className="text-xs font-medium text-muted-foreground mb-2">LANGUAGE & LOCATION</p>
                  <div className="space-y-2">
                    <LanguageSelector />
                    <LocationSelector showDistrict={true} />
                  </div>
                </div>
              </div>

              {navLinks.map((link) => (
                <div key={link.href}>
                  <Link
                    to={link.href}
                    className={`text-sm font-medium transition-colors hover:text-primary px-2 py-1 ${
                      isActivePath(link.href)
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {/* Show dropdown links in mobile */}
                  {link.dropdown && (
                    <div className="ml-4 mt-2 space-y-2">
                      {link.dropdown.map((subLink) => (
                        <Link
                          key={subLink.href}
                          to={subLink.href}
                          className="block text-xs text-muted-foreground hover:text-primary px-2 py-1"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subLink.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {isAuthenticated ? (
                <>
                  <div className="border-t pt-3 mt-3">
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-primary px-2 py-1"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      <span>{t("navigation.dashboard")}</span>
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-primary px-2 py-1"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Settings className="h-4 w-4" />
                      <span>{t("navigation.profile")}</span>
                    </Link>
                    <Link
                      to="/bookings"
                      className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-primary px-2 py-1"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Calendar className="h-4 w-4" />
                      <span>{t("navigation.bookings")}</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-primary px-2 py-1 w-full text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>{t("navigation.logout")}</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="border-t pt-3 mt-3 flex flex-col space-y-2">
                  <Button variant="ghost" asChild className="justify-start">
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      {t("navigation.login")}
                    </Link>
                  </Button>
                  <Button asChild className="justify-start">
                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                      {t("navigation.register")}
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
