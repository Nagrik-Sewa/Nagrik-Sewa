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
  GraduationCap,
  FileText,
  HelpCircle,
  Briefcase,
  Users,
  Shield,
  Home as HomeIcon,
  ChevronDown,
  Heart,
  Star
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
      href: "/services", 
      label: t("navigation.services"), 
      icon: Briefcase,
      dropdown: [
        { href: "/services/home", label: t("navigation.homeServices") },
        { href: "/services/construction", label: t("navigation.construction") },
        { href: "/services/electrical", label: t("navigation.electrical") },
        { href: "/services/plumbing", label: t("navigation.plumbing") },
        { href: "/services/cleaning", label: t("navigation.cleaning") },
        { href: "/services/gardening", label: t("navigation.gardening") }
      ]
    },
    { href: "/workers", label: t("navigation.workers"), icon: Users }
  ];

  // Additional navigation links for different user types
  const workerLinks = [
    { 
      href: "/join-as-worker", 
      label: t("navigation.joinAsWorker"), 
      icon: Users,
      description: "Start your journey"
    },
    { 
      href: "/skill-training", 
      label: t("navigation.skillTraining"), 
      icon: GraduationCap,
      description: "Enhance your skills"
    },
    { 
      href: "/resume-builder", 
      label: t("navigation.resumeBuilder"), 
      icon: FileText,
      description: "Create professional resume"
    },
    { 
      href: "/get-verified", 
      label: t("navigation.getVerified"), 
      icon: Shield,
      description: "Verify your credentials"
    }
  ];

  const helpLinks = [
    { href: "/support", label: t("navigation.support"), icon: HelpCircle },
    { href: "/worker-support", label: t("navigation.workerSupport"), icon: Users }
  ];

  // For testing purposes, show all links regardless of auth status
  const userLinks: NavLink[] = [];

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
            {[...navLinks, ...userLinks].map((link) => (
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
                      <DropdownMenuItem asChild>
                        <Link to={link.href} className="w-full">
                          {link.label} - All
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
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
            
            {/* Additional Navigation Items */}
            {/* For Workers Navigation */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group">
                  <div className="flex items-center space-x-1 px-3 py-1.5 rounded-md group-hover:bg-primary/5">
                    <GraduationCap className="h-4 w-4" />
                    <span>{t("navigation.forWorkers")}</span>
                    <ChevronDown className="h-3 w-3" />
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Worker Services
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {workerLinks.map((workerLink) => (
                  <DropdownMenuItem key={workerLink.href} asChild>
                    <Link to={workerLink.href} className="w-full flex items-start space-x-3 p-2">
                      <workerLink.icon className="h-4 w-4 mt-0.5 text-primary" />
                      <div className="flex flex-col">
                        <span className="font-medium">{workerLink.label}</span>
                        <span className="text-xs text-muted-foreground">{workerLink.description}</span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/worker-support" className="w-full flex items-center space-x-2">
                    <HelpCircle className="h-4 w-4 text-primary" />
                    <span>Worker Support</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Help & Support Navigation */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group">
                  <div className="flex items-center space-x-1 px-3 py-1.5 rounded-md group-hover:bg-primary/5">
                    <HelpCircle className="h-4 w-4" />
                    <span>Help</span>
                    <ChevronDown className="h-3 w-3" />
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Support & Information
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {helpLinks.map((helpLink) => (
                  <DropdownMenuItem key={helpLink.href} asChild>
                    <Link to={helpLink.href} className="w-full flex items-center space-x-2">
                      <helpLink.icon className="h-4 w-4 text-primary" />
                      <span>{helpLink.label}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/privacy" className="w-full flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>Privacy Policy</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/terms" className="w-full flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span>Terms of Service</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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

              {[...navLinks, ...userLinks].map((link) => (
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
                  {/* Show service subcategories in mobile */}
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
              
              {/* Mobile Worker Links */}
              <div className="border-t pt-3 mt-3">
                <div className="flex items-center space-x-2 mb-3 px-2">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  <p className="text-xs font-medium text-muted-foreground">{t("navigation.forWorkers").toUpperCase()}</p>
                </div>
                {workerLinks.map((workerLink) => (
                  <Link
                    key={workerLink.href}
                    to={workerLink.href}
                    className="flex items-start space-x-3 text-sm font-medium text-muted-foreground hover:text-primary px-2 py-2 rounded-md hover:bg-primary/5 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <workerLink.icon className="h-4 w-4 mt-0.5 text-primary" />
                    <div className="flex flex-col">
                      <span>{workerLink.label}</span>
                      <span className="text-xs opacity-70">{workerLink.description}</span>
                    </div>
                  </Link>
                ))}
                <Link
                  to="/worker-support"
                  className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-primary px-2 py-1 mt-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <HelpCircle className="h-4 w-4 text-primary" />
                  <span>Worker Support</span>
                </Link>
              </div>

              {/* Mobile Help Links */}
              <div className="border-t pt-3 mt-3">
                <div className="flex items-center space-x-2 mb-3 px-2">
                  <HelpCircle className="h-4 w-4 text-primary" />
                  <p className="text-xs font-medium text-muted-foreground">HELP & SUPPORT</p>
                </div>
                {helpLinks.map((helpLink) => (
                  <Link
                    key={helpLink.href}
                    to={helpLink.href}
                    className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-primary px-2 py-1 rounded-md hover:bg-primary/5 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <helpLink.icon className="h-4 w-4 text-primary" />
                    <span>{helpLink.label}</span>
                  </Link>
                ))}
                <Link
                  to="/privacy"
                  className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-primary px-2 py-1 rounded-md hover:bg-primary/5 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Shield className="h-4 w-4 text-primary" />
                  <span>Privacy Policy</span>
                </Link>
                <Link
                  to="/terms"
                  className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-primary px-2 py-1 rounded-md hover:bg-primary/5 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FileText className="h-4 w-4 text-primary" />
                  <span>Terms of Service</span>
                </Link>
              </div>
              
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
