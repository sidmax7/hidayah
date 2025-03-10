'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import QRCode from 'react-qr-code';
import { useState, useEffect } from 'react';

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const upiId = '9686204007@jupiteraxis';
  const payeeName = 'Mohammed-Raihaan-Hussain';
  
  // Handle mounting and redirects in separate effects
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Handle redirects in a separate effect that runs after mounting
  useEffect(() => {
    if (!isMounted) return;
    
    const userAgent = navigator.userAgent || navigator.vendor || '';
    const isMobile = /android|iphone|ipad|ipod/i.test(userAgent);
    const isAndroid = /android/i.test(userAgent);
    
    if (isMobile) {
      if (isAndroid) {
        window.location.href = 'upi://pay?pa=9686204007@jupiteraxis&pn=Mohammed-Raihaan-Hussain&cu=INR&tn=Donation';
      } else {
        window.location.href = 'gpay://upi/pay?pa=9686204007@jupiteraxis&pn=Mohammed-Raihaan-Hussain&cu=INR&tn=Donation';
        setTimeout(() => {
          window.location.href = 'phonepe://pay?pa=9686204007@jupiteraxis&pn=Mohammed-Raihaan-Hussain&cu=INR&tn=Donation';
        }, 1000);
      }
    }
  }, [isMounted]);
  
  // Generate UPI URL for QR code
  const getUpiUrl = (amount: number | null) => {
    const baseUrl = `upi://pay?pa=${upiId}&pn=${payeeName}&cu=INR&tn=Donation`;
    return amount ? `${baseUrl}&am=${amount}` : baseUrl;
  };

  // Show loading state until client-side code runs
  if (!isMounted) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-20 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between px-4 max-w-4xl mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex flex-col">
              <h1 className="text-xl font-bold">Hidayah</h1>
              <p className="text-xs text-muted-foreground">Islamic Guidance AI</p>
            </div>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold mb-6">Support Hidayah</h1>
          
          <p className="text-lg mb-8 max-w-2xl">
            Your donations help us maintain and improve Hidayah to provide better Islamic guidance.
            Every contribution, no matter how small, makes a difference.
          </p>
          
          <div className="bg-muted p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Scan to Donate via UPI</h2>
            
            {/* Preset donation amounts */}
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              <p className="w-full text-sm mb-2">Select an amount:</p>
              {[null, 100, 200, 500, 1000].map((amount, index) => (
                <Button 
                  key={index}
                  variant={selectedAmount === amount ? "default" : "outline"}
                  onClick={() => setSelectedAmount(amount)}
                >
                  {amount === null ? "Any Amount" : `₹${amount}`}
                </Button>
              ))}
            </div>
            
            <div className="bg-white p-4 rounded-md inline-block mb-4">
              {/* Dynamically generated QR code */}
              <QRCode 
                value={getUpiUrl(selectedAmount)}
                size={200}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                viewBox={`0 0 256 256`}
              />
            </div>
            
            <p className="text-sm text-muted-foreground mb-2">
              UPI ID: <span className="font-medium">{upiId}</span>
            </p>
            
            {selectedAmount && (
              <p className="text-sm font-medium mb-4">
                Selected amount: ₹{selectedAmount}
              </p>
            )}
          </div>
          
          <Link href="/">
            <Button variant="outline">
              Return to Home
            </Button>
          </Link>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t py-6 bg-background/80">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Thank you for supporting Hidayah. Your contributions help us continue our mission.
          </p>
        </div>
      </footer>
    </div>
  );
} 