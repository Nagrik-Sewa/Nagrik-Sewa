import { Scale, FileCheck, AlertTriangle, Shield, Users, CreditCard } from "lucide-react";
import { CONTACT_INFO } from "../constants/contact";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Scale className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-brand-100">
              Terms and conditions governing the use of Nagrik Sewa platform
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
              <FileCheck className="w-6 h-6 mr-2 text-brand-600" />
              Agreement to Terms
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms of Service ("Terms") govern your use of the Nagrik Sewa platform operated by Nagrik Sewa Technologies Pvt. Ltd. ("Company," "we," "us," or "our"). By accessing or using our platform, you agree to be bound by these Terms.
            </p>
            <p className="text-gray-700 leading-relaxed">
              If you do not agree to these Terms, please do not use our services. We reserve the right to modify these Terms at any time, and your continued use constitutes acceptance of such modifications.
            </p>
          </section>

          {/* Platform Description */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Users className="w-6 h-6 mr-2 text-brand-600" />
              Platform Description
            </h2>
            
            <p className="text-gray-700 mb-4">
              Nagrik Sewa is a digital platform that connects customers with verified service providers across India for various home and professional services including:
            </p>
            
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Home cleaning and maintenance services</li>
              <li>Plumbing, electrical, and repair services</li>
              <li>Beauty and wellness services</li>
              <li>Appliance installation and repair</li>
              <li>Pest control and sanitization</li>
              <li>Other professional services as listed on our platform</li>
            </ul>

            <p className="text-gray-700">
              We act as an intermediary platform and do not directly provide services. All services are performed by independent service providers.
            </p>
          </section>

          {/* User Eligibility */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">User Eligibility</h2>
            
            <div className="space-y-4">
              <p className="text-gray-700">To use our platform, you must:</p>
              
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Be at least 18 years of age</li>
                <li>Have the legal capacity to enter into contracts</li>
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not have been previously banned from our platform</li>
              </ul>
            </div>
          </section>

          {/* Account Registration */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Account Registration</h2>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Customer Accounts</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Provide accurate personal information</li>
                <li>Verify your phone number and email address</li>
                <li>Maintain updated contact and address information</li>
                <li>Keep your account secure and confidential</li>
              </ul>

              <h3 className="text-lg font-semibold">Service Provider Accounts</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Complete identity verification (KYC process)</li>
                <li>Provide valid business licenses and certifications</li>
                <li>Submit background check documentation</li>
                <li>Maintain professional insurance coverage</li>
                <li>Agree to our Service Provider Code of Conduct</li>
              </ul>
            </div>
          </section>

          {/* Service Bookings */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <CreditCard className="w-6 h-6 mr-2 text-brand-600" />
              Service Bookings and Payments
            </h2>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Booking Process</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Service requests are subject to provider availability</li>
                <li>Prices are determined by service providers</li>
                <li>All bookings must be confirmed by the service provider</li>
                <li>Cancellation policies vary by service type and provider</li>
              </ul>

              <h3 className="text-lg font-semibold">Payment Terms</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Payments are processed securely through our platform</li>
                <li>Service fees are collected at the time of booking</li>
                <li>Platform commission is deducted from provider payments</li>
                <li>Refunds are processed according to our refund policy</li>
                <li>All prices include applicable taxes unless stated otherwise</li>
              </ul>
            </div>
          </section>

          {/* User Responsibilities */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">User Responsibilities</h2>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Customer Responsibilities</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Provide accurate service requirements and location details</li>
                <li>Be present at the scheduled service time</li>
                <li>Ensure safe access to the service location</li>
                <li>Treat service providers with respect and courtesy</li>
                <li>Pay for services as agreed</li>
                <li>Provide honest reviews and feedback</li>
              </ul>

              <h3 className="text-lg font-semibold">Service Provider Responsibilities</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Deliver services professionally and on time</li>
                <li>Maintain required licenses and insurance</li>
                <li>Use appropriate tools and safety equipment</li>
                <li>Respect customer property and privacy</li>
                <li>Provide accurate service estimates</li>
                <li>Respond promptly to customer communications</li>
              </ul>
            </div>
          </section>

          {/* Prohibited Activities */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2 text-red-600" />
              Prohibited Activities
            </h2>
            
            <p className="text-gray-700 mb-4">The following activities are strictly prohibited:</p>
            
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Posting false or misleading information</li>
              <li>Attempting to circumvent our payment system</li>
              <li>Harassing or discriminating against other users</li>
              <li>Using the platform for illegal activities</li>
              <li>Creating fake accounts or impersonating others</li>
              <li>Sharing personal contact information to avoid platform fees</li>
              <li>Soliciting services outside our platform</li>
              <li>Posting inappropriate content or reviews</li>
              <li>Interfering with platform operations or security</li>
            </ul>
          </section>

          {/* Quality Assurance */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Shield className="w-6 h-6 mr-2 text-brand-600" />
              Quality Assurance and Safety
            </h2>
            
            <div className="space-y-4">
              <p className="text-gray-700">
                We are committed to maintaining high service quality and user safety:
              </p>
              
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>All service providers undergo background verification</li>
                <li>We maintain a rating and review system</li>
                <li>Customer support is available for dispute resolution</li>
                <li>We provide insurance coverage for certain services</li>
                <li>Emergency helpline available 24/7</li>
                <li>Regular quality audits and feedback collection</li>
              </ul>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
            
            <div className="space-y-4">
              <p className="text-gray-700">
                To the maximum extent permitted by law, Nagrik Sewa shall not be liable for:
              </p>
              
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Quality of services provided by third-party service providers</li>
                <li>Property damage caused by service providers</li>
                <li>Delays or cancellations beyond our control</li>
                <li>Loss of data or business interruption</li>
                <li>Indirect, consequential, or punitive damages</li>
                <li>Total liability exceeding the amount paid for the specific service</li>
              </ul>

              <p className="text-gray-700 mt-4">
                We provide the platform "as is" without warranties of any kind, express or implied.
              </p>
            </div>
          </section>

          {/* Dispute Resolution */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Dispute Resolution</h2>
            
            <div className="space-y-4">
              <p className="text-gray-700">
                We encourage users to resolve disputes amicably through our platform:
              </p>
              
              <ol className="list-decimal list-inside text-gray-700 space-y-2">
                <li>Contact our customer support team within 24 hours</li>
                <li>Provide detailed information about the issue</li>
                <li>Cooperate with our investigation process</li>
                <li>Accept mediation through our dispute resolution team</li>
                <li>If unresolved, disputes will be subject to arbitration under Indian law</li>
              </ol>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
            
            <p className="text-gray-700 mb-4">
              All intellectual property rights in the Nagrik Sewa platform, including but not limited to:
            </p>
            
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Website design, logos, and branding</li>
              <li>Software, algorithms, and technology</li>
              <li>Content, text, and images</li>
              <li>Trade names and trademarks</li>
            </ul>

            <p className="text-gray-700 mt-4">
              These remain the exclusive property of Nagrik Sewa Technologies Pvt. Ltd. Users are granted a limited, non-exclusive license to use the platform for its intended purpose.
            </p>
          </section>

          {/* Termination */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Termination</h2>
            
            <div className="space-y-4">
              <p className="text-gray-700">
                We may terminate or suspend your account immediately, without prior notice, for:
              </p>
              
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Violation of these Terms of Service</li>
                <li>Fraudulent or illegal activities</li>
                <li>Harm to other users or the platform</li>
                <li>Failure to pay for services</li>
                <li>Inactivity for extended periods</li>
              </ul>

              <p className="text-gray-700">
                You may terminate your account at any time by contacting customer support. Upon termination, your right to use the platform ceases immediately.
              </p>
            </div>
          </section>

          {/* Governing Law */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
            
            <p className="text-gray-700">
              These Terms are governed by and construed in accordance with the laws of India. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                For questions about these Terms of Service, please contact us:
              </p>
              
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> {CONTACT_INFO.LEGAL_EMAIL}</p>
                <p><strong>Phone:</strong> {CONTACT_INFO.MAIN_SUPPORT_PHONE}</p>
                <p><strong>Address:</strong> {CONTACT_INFO.FULL_ADDRESS}</p>
                <p><strong>Customer Support:</strong> {CONTACT_INFO.MAIN_EMAIL}</p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
