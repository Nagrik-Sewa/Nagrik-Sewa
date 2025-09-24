import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
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
} from "lucide-react";

import { LanguageSelector } from "@/components/LanguageSelector";
import { LocationSelector } from "@/components/LocationSelector";

export function Navigation() {
  const { user, isAuthenticated, logout } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActivePath = (path: string) => location.pathname === path;

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
        { href: "/services/gardening", label: t("navigation.gardening") },
      ],
    },
    {
      href: "#",
      label: t("navigation.forWorkers"),
      icon: Users,
      dropdown: [
        { href: "/workers", label: t("navigation.browseWorkers") },
        { href: "/join-as-worker", label: t("navigation.joinAsWorker") },
        { href: "/skill-training", label: t("navigation.skillTraining") },
        { href: "/resume-builder", label: t("navigation.resumeBuilder") },
        { href: "/get-verified", label: t("navigation.getVerified") },
        { href: "/worker-support", label: t("navigation.workerSupport") },
      ],
    },
    {
      href: "#",
      label: "For Customers",
      icon: Users,
      dropdown: [
        { href: "/auth/register", label: "Join as Customer" },
        { href: "/workers", label: "Find Worker" },
      ],
    },
  ];

  const workerLinks: NavLink[] = [
    { href: "/join-as-worker", label: t("navigation.joinAsWorker"), icon: Users },
    { href: "/skill-training", label: t("navigation.skillTraining"), icon: GraduationCap },
    { href: "/resume-builder", label: t("navigation.resumeBuilder"), icon: FileText },
    { href: "/get-verified", label: t("navigation.getVerified"), icon: Shield },
    { href: "/worker-support", label: t("navigation.workerSupport"), icon: HelpCircle },
  ];

  const helpLinks: NavLink[] = [
    { href: "/support", label: t("navigation.support"), icon: HelpCircle },
    { href: "/privacy", label: t("navigation.privacy"), icon: Shield },
    { href: "/terms", label: t("navigation.terms"), icon: FileText },
  ];

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src="/logo-hindi.svg" alt="Nagrik Sewa" className="h-12 w-12" />
            <div className="flex flex-col">
              <span className="font-bold text-lg text-green-600">Nagrik Sewa</span>
              <span className="text-xs text-gray-500 -mt-1">AI-Powered Services</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {[...navLinks].map((link) => (
              <div key={link.href} className="relative group">
                {link.dropdown ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary ${
                          isActivePath(link.href) ||
                          link.dropdown.some((subLink) => isActivePath(subLink.href))
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
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
                      isActivePath(link.href) ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Language and Location Selectors */}
            <div className="flex items-center space-x-3 border-r pr-4">
              <LanguageSelector variant="compact" />
              <LocationSelector variant="compact" showDistrict />
            </div>

            {/* Auth Section */}
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
                          {user?.firstName?.[0]}
                          {user?.lastName?.[0]}
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
                        <span>{t("navigation.resumeBuilder")}</span>
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
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </nav>
  );
}
