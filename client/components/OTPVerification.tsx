import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Phone, Mail } from 'lucide-react';

interface OTPVerificationProps {
  userId: string;
  phone: string;
  email: string;
  onVerificationComplete: () => void;
  testOTP?: {
    phone: string;
    email: string;
  };
}

export const OTPVerification: React.FC<OTPVerificationProps> = ({
  userId,
  phone,
  email,
  onVerificationComplete,
  testOTP
}) => {
  const [phoneOTP, setPhoneOTP] = useState('');
  const [emailOTP, setEmailOTP] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const { verifyOTP } = useAuth();

  const handleVerify = async () => {
    if (!phoneOTP && !emailOTP) {
      return;
    }

    setIsVerifying(true);
    try {
      const result = await verifyOTP(userId, phoneOTP || undefined, emailOTP || undefined);
      
      if (result.data.token) {
        // Verification complete - user is now logged in
        onVerificationComplete();
      } else {
        // Partial verification - need both OTPs
        // Component will remain visible for additional verification
      }
    } catch (error) {
      console.error('OTP verification failed:', error);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Verify Your Account</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {testOTP && (
          <Alert>
            <AlertDescription>
              <strong>Test Mode:</strong> Phone OTP: {testOTP.phone}, Email OTP: {testOTP.email}
            </AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Phone OTP ({phone})
          </label>
          <Input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={phoneOTP}
            onChange={(e) => setPhoneOTP(e.target.value)}
            maxLength={6}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email OTP ({email})
          </label>
          <Input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={emailOTP}
            onChange={(e) => setEmailOTP(e.target.value)}
            maxLength={6}
          />
        </div>

        <Button
          onClick={handleVerify}
          disabled={isVerifying || (!phoneOTP && !emailOTP)}
          className="w-full"
        >
          {isVerifying ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Verifying...
            </>
          ) : (
            'Verify Account'
          )}
        </Button>

        <p className="text-sm text-muted-foreground text-center">
          Enter the OTP codes sent to your phone and email to complete registration.
        </p>
      </CardContent>
    </Card>
  );
};