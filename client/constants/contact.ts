// Contact information constants for Nagrik Sewa
export const CONTACT_INFO = {
  // Emergency contacts
  EMERGENCY_HELPLINE: "112",
  SAFETY_HELPLINE: "+91-11-4567-8911", 
  TECHNICAL_EMERGENCY: "+91-11-4567-8922",
  
  // Main support contacts
  MAIN_SUPPORT_PHONE: "+91-11-4567-8900",
  CUSTOMER_SUPPORT_PHONE: "+91-11-4567-8900",
  WORKER_SUPPORT_PHONE: "+91-11-4567-8901",
  WHATSAPP_NUMBER: "919876543210",
  
  // Email addresses
  MAIN_EMAIL: "support@nagriksewa.com",
  PRIVACY_EMAIL: "privacy@nagriksewa.com",
  LEGAL_EMAIL: "legal@nagriksewa.com",
  DPO_EMAIL: "dpo@nagriksewa.com",
  WORKER_SUPPORT_EMAIL: "workers@nagriksewa.com",
  
  // Business information
  COMPANY_NAME: "Nagrik Sewa Technologies Pvt. Ltd.",
  ADDRESS: "New Delhi, India",
  FULL_ADDRESS: "Nagrik Sewa Technologies Pvt. Ltd., New Delhi, India",
  
  // Social media and other
  WEBSITE: "https://nagriksewa.com",
  
  // Support availability
  PHONE_AVAILABILITY: "24/7 Available",
  CHAT_AVAILABILITY: "Mon-Sat, 9 AM - 10 PM",
  EMAIL_RESPONSE_TIME: "Response within 4 hours"
};

// Helper function to make phone calls
export const makePhoneCall = (phoneNumber: string) => {
  const cleanNumber = phoneNumber.replace(/\s+/g, '');
  console.log(`Making call to: ${cleanNumber}`);
  window.location.href = `tel:${cleanNumber}`;
};

// Helper function to send emails
export const sendEmail = (email: string, subject?: string) => {
  const mailtoUrl = subject 
    ? `mailto:${email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${email}`;
  window.location.href = mailtoUrl;
};
