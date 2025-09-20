import { Scale } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Terms() {
  const { t } = useLanguage();
  const today = new Date();
  const lastUpdated = today.toLocaleDateString('en-IN');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <Scale className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">{t('legal.terms.title') || 'Terms of Service'}</h1>
            <p className="text-xl text-brand-100">{t('legal.terms.subtitle') || 'Terms and conditions governing the use of Nagrik Sewa platform'}</p>
            <p className="text-sm text-brand-200 mt-2">
              {t('legal.terms.lastUpdated') || 'Last updated'}: {lastUpdated}
            </p>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
          <p className="text-gray-700 mb-4">
            Welcome to Nagrik Sewa. By using our platform, you agree to these comprehensive terms and conditions.
          </p>
          
          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h3>
              <p className="text-gray-700">
                These Terms constitute a legally binding agreement between you and Nagrik Sewa Technologies Private Limited.
              </p>
            </section>
            
            <section>
              <h3 className="text-xl font-semibold mb-3">2. DigiLocker Integration</h3>
              <p className="text-gray-700">
                We have integrated DigiLocker for secure government-approved identity verification, enhancing trust and safety.
              </p>
            </section>
            
            <section>
              <h3 className="text-xl font-semibold mb-3">3. Payment and Refunds</h3>
              <p className="text-gray-700">
                We accept multiple payment methods including UPI, cards, net banking, and wallets. Refund policies vary by cancellation timing.
              </p>
            </section>
            
            <section>
              <h3 className="text-xl font-semibold mb-3">4. Contact Information</h3>
              <div className="bg-gray-50 p-4 rounded">
                <p><strong>Email:</strong> support@nagriksewa.gov.in</p>
                <p><strong>Phone:</strong> +91-11-4567-8900</p>
                <p><strong>Legal:</strong> legal@nagriksewa.gov.in</p>
              </div>
            </section>
          </div>
          
          <div className="border-t pt-6 mt-8 text-center text-gray-600">
            <p>Terms effective as of {lastUpdated} (Auto-updated daily)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
