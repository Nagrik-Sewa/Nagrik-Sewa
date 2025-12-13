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

interface NavLink {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  dropdown?: { href: string; label: string }[];
}

export function Navigation() {
  const { user, isAuthenticated, logout } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const isActivePath = (path: string) => location.pathname === path;

  const navLinks: NavLink[] = [
    { href: "/", label: t("navigation.home"), icon: HomeIcon },
    {
      href: "#workers",
      label: t("navigation.forWorkers"),
      icon: Users,
      dropdown: [
        { href: "/join-as-worker", label: t("navigation.joinAsWorker") },
        { href: "/find-customers", label: t("navigation.findCustomers") },
        { href: "/get-verified", label: t("navigation.getVerified") },
        { href: "/worker-support", label: t("navigation.workerSupport") },
      ],
    },
    {
      href: "#customers",
      label: t("navigation.forCustomers"),
      icon: Users,
      dropdown: [
        { href: "/join-as-customer", label: t("navigation.joinAsCustomer") },
        { href: "/workers", label: t("navigation.workers") },
        { href: "/get-verified", label: t("navigation.getVerified") },
        { href: "/customer-support", label: t("navigation.support") },
      ],
    },
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
            {navLinks.map((link) => (
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
                        {link.icon && <link.icon className="h-4 w-4" />}
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
                    className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary ${
                      isActivePath(link.href) ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {link.icon && <link.icon className="h-4 w-4" />}
                    <span>{link.label}</span>
                  </Link>
                )}
              </div>
            ))}

            {/* Language & Location Selectors */}
            <div className="flex items-center space-x-3 border-r pr-4">
              <LanguageSelector variant="compact" />
              <LocationSelector variant="compact" showDistrict />
            </div>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
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
                        {t("navigation.dashboard")}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile">
                        <Settings className="mr-2 h-4 w-4" />
                        {t("navigation.profile")}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/bookings">
                        <Calendar className="mr-2 h-4 w-4" />
                        {t("navigation.bookings")}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/resume-builder">
                        <FileText className="mr-2 h-4 w-4" />
                        {t("navigation.resumeBuilder")}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      {t("navigation.logout")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">{t("navigation.login")}</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">{t("navigation.register")}</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 space-y-2 pb-4">
            {navLinks.map((link) => (
              <div key={link.href}>
                {link.dropdown ? (
                  <>
                    <button
                      className="flex w-full items-center justify-between px-2 py-2 text-left text-sm font-medium text-muted-foreground hover:text-primary"
                      onClick={() =>
                        setOpenDropdown(openDropdown === link.label ? null : link.label)
                      }
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          openDropdown === link.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openDropdown === link.label && (
                      <div className="ml-4 mt-1 space-y-1">
                        {link.dropdown.map((subLink) => (
                          <Link
                            key={subLink.href}
                            to={subLink.href}
                            className={`block px-2 py-1 text-sm font-medium transition-colors hover:text-primary ${
                              isActivePath(subLink.href) ? "text-primary" : "text-muted-foreground"
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subLink.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={link.href}
                    className={`block px-2 py-2 text-sm font-medium transition-colors hover:text-primary ${
                      isActivePath(link.href) ? "text-primary" : "text-muted-foreground"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Auth links in mobile */}
            <div className="mt-2 space-y-2 border-t pt-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/bookings"
                    className="block px-2 py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("navigation.bookings")}
                  </Link>
                  <button
                    className="block w-full text-left px-2 py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                    onClick={logout}
                  >
                    {t("navigation.logout")}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-2 py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("navigation.login")}
                  </Link>
                  <Link
                    to="/register"
                    className="block px-2 py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("navigation.register")}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
