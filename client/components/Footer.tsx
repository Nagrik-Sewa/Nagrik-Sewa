import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { 
  Facebook, 
  Twitter, 
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

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Trust Indicators */}
      <div className="bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex items-center justify-center space-x-3">
              <Shield className="w-8 h-8 text-brand-400" />
              <div>
                <p className="font-semibold">Verified Workers</p>
                <p className="text-sm text-gray-400">KYC & Background Checked</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Users className="w-8 h-8 text-orange-400" />
              <div>
                <p className="font-semibold">50,000+ Workers</p>
                <p className="text-sm text-gray-400">Across All Major Cities</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Award className="w-8 h-8 text-brand-400" />
              <div>
                <p className="font-semibold">Govt. Recognized</p>
                <p className="text-sm text-gray-400">Skill India Certified</p>
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
                Connecting skilled workers with customers across India. 
                Empowering laborers, serving citizens.
              </p>
              <div className="flex space-x-3">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-500 hover:bg-transparent">
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-black hover:bg-transparent">
                  <Twitter className="w-5 h-5" />
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
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/services/home" className="hover:text-white">Home Services</Link></li>
                <li><Link to="/services/construction" className="hover:text-white">Construction</Link></li>
                <li><Link to="/services/electrical" className="hover:text-white">Electrical Work</Link></li>
                <li><Link to="/services/plumbing" className="hover:text-white">Plumbing</Link></li>
                <li><Link to="/services/cleaning" className="hover:text-white">Cleaning</Link></li>
                <li><Link to="/services/gardening" className="hover:text-white">Gardening</Link></li>
              </ul>
            </div>

            {/* For Workers */}
            <div>
              <h4 className="font-semibold mb-4">For Workers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/join-worker" className="hover:text-white">Join as Worker</Link></li>
                <li><Link to="/training" className="hover:text-white">Skill Training</Link></li>
                <li><Link to="/verification" className="hover:text-white">Get Verified</Link></li>
                <li><Link to="/resume-builder" className="hover:text-white">Resume Builder</Link></li>
                <li><Link to="/worker-support" className="hover:text-white">Worker Support</Link></li>
                <li><Link to="/government-schemes" className="hover:text-white">Govt. Schemes</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
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
                <h5 className="font-medium mb-2">Emergency Helpline</h5>
                <Button 
                  onClick={() => makePhoneCall(CONTACT_INFO.EMERGENCY_HELPLINE)}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Emergency: {CONTACT_INFO.EMERGENCY_HELPLINE}
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
                © 2025 Nagrik Sewa. All rights reserved. | Made with ❤️ for India<br />
                <span className="block mt-1">Made by Pushkar Kumar Saini</span>
              </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm">Terms of Service</Link>
              <Link to="/support" className="text-gray-400 hover:text-white text-sm">Support</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
