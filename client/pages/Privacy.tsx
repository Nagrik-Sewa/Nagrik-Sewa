import { Shield, Lock, Eye, Database, Users, FileText } from "lucide-react";
import { CONTACT_INFO } from "../constants/contact";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Shield className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-brand-100">
              Your privacy and data security are our top priorities
            </p>
            <p className="text-sm text-brand-200 mt-2">
              Last updated: August 25, 2025
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <FileText className="w-6 h-6 mr-2 text-brand-600" />
              Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Nagrik Sewa ("we," "our," or "us") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our home services platform.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Database className="w-6 h-6 mr-2 text-brand-600" />
              Information We Collect
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Name, email address, and phone number</li>
                  <li>Home address and service location</li>
                  <li>Payment information (processed securely by our payment partners)</li>
                  <li>Government-issued ID for service provider verification</li>
                  <li>Profile photos and service portfolio images</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Usage Information</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Service requests and booking history</li>
                  <li>Reviews and ratings provided or received</li>
                  <li>Communication with service providers and support</li>
                  <li>Location data when using our mobile app</li>
                  <li>Device information and IP address</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Users className="w-6 h-6 mr-2 text-brand-600" />
              How We Use Your Information
            </h2>
            
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Connect you with verified service providers in your area</li>
              <li>Process payments and manage your account</li>
              <li>Send service notifications and booking confirmations</li>
              <li>Verify the identity of service providers for safety</li>
              <li>Improve our platform and develop new features</li>
              <li>Provide customer support and resolve disputes</li>
              <li>Send promotional offers (with your consent)</li>
              <li>Comply with legal obligations and prevent fraud</li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Lock className="w-6 h-6 mr-2 text-brand-600" />
              Data Security
            </h2>
            
            <div className="space-y-4">
              <p className="text-gray-700">
                We implement industry-standard security measures to protect your personal information:
              </p>
              
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>SSL encryption for all data transmission</li>
                <li>Secure data storage with encryption at rest</li>
                <li>Regular security audits and penetration testing</li>
                <li>Two-factor authentication for sensitive operations</li>
                <li>Limited access to personal data on a need-to-know basis</li>
                <li>PCI DSS compliance for payment processing</li>
              </ul>
            </div>
          </section>

          {/* Information Sharing */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Eye className="w-6 h-6 mr-2 text-brand-600" />
              Information Sharing
            </h2>
            
            <div className="space-y-4">
              <p className="text-gray-700">
                We do not sell your personal information. We may share your information in the following circumstances:
              </p>
              
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Service Providers:</strong> With verified professionals to fulfill your service requests</li>
                <li><strong>Payment Processing:</strong> With secure payment partners to process transactions</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Safety:</strong> To ensure user safety and prevent fraudulent activities</li>
                <li><strong>Business Transfer:</strong> In case of merger, acquisition, or sale of assets</li>
              </ul>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
            
            <div className="space-y-4">
              <p className="text-gray-700">You have the right to:</p>
              
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Access and download your personal data</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Delete your account and associated data</li>
                <li>Opt-out of promotional communications</li>
                <li>Restrict processing of your data</li>
                <li>Data portability to another service</li>
              </ul>
            </div>
          </section>

          {/* Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Cookies and Tracking</h2>
            
            <p className="text-gray-700 mb-4">
              We use cookies and similar technologies to enhance your experience:
            </p>
            
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for basic platform functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how you use our platform</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              <li><strong>Marketing Cookies:</strong> Show you relevant advertisements</li>
            </ul>
          </section>

          {/* Children's Privacy */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
            
            <p className="text-gray-700">
              Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child, we will delete it promptly.
            </p>
          </section>

          {/* International Transfers */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">International Data Transfers</h2>
            
            <p className="text-gray-700">
              Your information may be transferred to and processed in countries other than India. We ensure adequate protection through appropriate safeguards, including standard contractual clauses and adequacy decisions.
            </p>
          </section>

          {/* Updates */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Policy Updates</h2>
            
            <p className="text-gray-700">
              We may update this Privacy Policy periodically. We will notify you of significant changes via email or through our platform. Your continued use of our services constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> {CONTACT_INFO.PRIVACY_EMAIL}</p>
                <p><strong>Phone:</strong> {CONTACT_INFO.MAIN_SUPPORT_PHONE}</p>
                <p><strong>Address:</strong> {CONTACT_INFO.FULL_ADDRESS}</p>
                <p><strong>Data Protection Officer:</strong> {CONTACT_INFO.DPO_EMAIL}</p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
