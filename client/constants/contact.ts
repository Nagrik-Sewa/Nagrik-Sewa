// Contact information constants for Nagrik Sewa
export const CONTACT_INFO = {
  // Emergency contacts
  EMERGENCY_HELPLINE: "112",
  SAFETY_HELPLINE: "+91-11-4567-8911", 
  TECHNICAL_EMERGENCY: "+91-11-4567-8922",
  
  // Main support contacts
  MAIN_SUPPORT_PHONE: "+91 7983454047",
  CUSTOMER_SUPPORT_PHONE: "+91 7983454047",
  WORKER_SUPPORT_PHONE: "+91 7983454047",
  WHATSAPP_NUMBER: "917983454047",
  
  // Email addresses
  MAIN_EMAIL: "nagriksewa.connect@gmail.com",
  PRIVACY_EMAIL: "nagriksewa.connect@gmail.com",
  LEGAL_EMAIL: "nagriksewa.connect@gmail.com",
  DPO_EMAIL: "nagriksewa.connect@gmail.com",
  WORKER_SUPPORT_EMAIL: "nagriksewa.connect@gmail.com",
  
  // Business information
  COMPANY_NAME: "Nagrik Sewa Technologies Pvt. Ltd.",
  ADDRESS: "Moradabad, Uttar Pradesh, India",
  FULL_ADDRESS: "Nagrik Sewa Technologies Pvt. Ltd., Moradabad, Uttar Pradesh, India",
  
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
