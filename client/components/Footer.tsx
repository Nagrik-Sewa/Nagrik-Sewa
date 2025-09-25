import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { 
  Facebook, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  Shield,
  Award,
  Users
} from "lucide-react";
import { CONTACT_INFO, makePhoneCall, sendEmail } from "../constants/contact";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePlatformStats } from "@/hooks/use-platform-stats";

// Custom X (formerly Twitter) logo component
const XLogo = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export function Footer() {
  const { t } = useLanguage();
  const { stats, loading } = usePlatformStats();

  // Format numbers for display
  const formatNumber = (num: number) => {
    if (num >= 100000) {
      return `${Math.floor(num / 1000)}K+`;
    } else if (num >= 1000) {
      return `${Math.floor(num / 1000)}K+`;
    }
    return `${num}+`;
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Trust Indicators */}
      <div className="bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex items-center justify-center space-x-3">
              <Users className="w-8 h-8 text-blue-400" />
              <div>
                <p className="font-semibold">
                  {loading ? '...' : formatNumber(stats?.totalCustomers || 35000)}
                </p>
                <p className="text-sm text-gray-400">Happy Customers</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Users className="w-8 h-8 text-green-400" />
              <div>
                <p className="font-semibold">
                  {loading ? '...' : formatNumber(stats?.totalWorkers || 15000)}
                </p>
                <p className="text-sm text-gray-400">Skilled Workers</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Award className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="font-semibold">640+</p>
                <p className="text-sm text-gray-400">Districts Covered</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">न</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold">Nagrik Sewa</h3>
                  <p className="text-sm text-gray-400">नागरिक सेवा</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                {t("footer.companyDescription")}
              </p>
              <div className="flex space-x-3">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-500 hover:bg-transparent">
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-cyan-500 hover:bg-transparent">
                  <XLogo className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-pink-500 hover:bg-transparent">
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-500 hover:bg-transparent">
                  <Youtube className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold mb-4">{t("footer.services")}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/services/home" className="hover:text-white">{t("navigation.homeServices")}</Link></li>
                <li><Link to="/services/construction" className="hover:text-white">{t("navigation.construction")}</Link></li>
                <li><Link to="/services/electrical" className="hover:text-white">{t("navigation.electrical")}</Link></li>
                <li><Link to="/services/plumbing" className="hover:text-white">{t("navigation.plumbing")}</Link></li>
                <li><Link to="/services/cleaning" className="hover:text-white">{t("navigation.cleaning")}</Link></li>
                <li><Link to="/services/gardening" className="hover:text-white">{t("navigation.gardening")}</Link></li>
              </ul>
            </div>

            {/* For Workers */}
            <div>
              <h4 className="font-semibold mb-4">{t("navigation.forWorkers")}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/register" className="hover:text-white" onClick={() => window.scrollTo(0, 0)}>{t("navigation.joinAsWorker")}</Link></li>
                <li><Link to="/skill-training" className="hover:text-white" onClick={() => window.scrollTo(0, 0)}>{t("navigation.skillTraining")}</Link></li>
                <li><Link to="/get-verified" className="hover:text-white" onClick={() => window.scrollTo(0, 0)}>{t("navigation.getVerified")}</Link></li>
                <li><Link to="/resume-builder" className="hover:text-white" onClick={() => window.scrollTo(0, 0)}>{t("navigation.resumeBuilder")}</Link></li>
                <li><Link to="/worker-support" className="hover:text-white" onClick={() => window.scrollTo(0, 0)}>{t("navigation.workerSupport")}</Link></li>
                <li><Link to="/join-as-worker" className="hover:text-white" onClick={() => window.scrollTo(0, 0)}>{t("footer.govtSchemes")}</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">{t("footer.contactUs")}</h4>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{CONTACT_INFO.MAIN_SUPPORT_PHONE}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{CONTACT_INFO.MAIN_EMAIL}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{CONTACT_INFO.ADDRESS}</span>
                </div>
              </div>
              
              <div className="mt-6">
                <h5 className="font-medium mb-2">{t("footer.emergencyHelpline")}</h5>
                <Button 
                  onClick={() => makePhoneCall(CONTACT_INFO.EMERGENCY_HELPLINE)}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {t("footer.emergency")}: {CONTACT_INFO.EMERGENCY_HELPLINE}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2025 Nagrik Sewa. {t("footer.copyright")}<br />
                <span className="block mt-1">Made with ❤️ by Pushkar Kumar Saini</span>
              </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm">{t("navigation.privacy")}</Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm">{t("navigation.terms")}</Link>
              <Link to="/support" className="text-gray-400 hover:text-white text-sm">{t("navigation.support")}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
