"use client"

import {
  useEffect,
  useState,
} from 'react';

import {
  ArrowLeft,
  Heart,
} from 'lucide-react';
import Link from 'next/link';
import QRCode from 'react-qr-code';

import { Button } from '@/components/ui/button';

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const upiId = "9686204007@kotak811"
  const payeeName = "Mohammed-Raihaan-Hussain"

  // Handle mounting and redirects in separate effects
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Handle redirects in a separate effect that runs after mounting
  useEffect(() => {
    if (!isMounted) return

    const userAgent = navigator.userAgent || navigator.vendor || ""
    const isMobile = /android|iphone|ipad|ipod/i.test(userAgent)
    const isAndroid = /android/i.test(userAgent)

    if (isMobile) {
      if (isAndroid) {
        window.location.href = "upi://pay?pa=9686204007@kotak811&pn=Mohammed-Raihaan-Hussain&cu=INR&tn=Donation"
      } else {
        window.location.href = "gpay://upi/pay?pa=9686204007@kotak811&pn=Mohammed-Raihaan-Hussain&cu=INR&tn=Donation"
        setTimeout(() => {
          window.location.href = "phonepe://pay?pa=9686204007@kotak811&pn=Mohammed-Raihaan-Hussain&cu=INR&tn=Donation"
        }, 1000)
      }
    }
  }, [isMounted])

  // Generate UPI URL for QR code
  const getUpiUrl = (amount: number | null) => {
    const baseUrl = `upi://pay?pa=${upiId}&pn=${payeeName}&cu=INR&tn=Donation`
    return amount ? `${baseUrl}&am=${amount}` : baseUrl
  }

  // Show loading state until client-side code runs
  if (!isMounted) {
    return (
      <div className="flex items-center justify-center min-h-screen islamic-pattern">
        <div className="animate-pulse-gentle">
          <h1 className="text-3xl font-calligraphy font-bold text-primary">Hidayah</h1>
          <p className="text-center text-muted-foreground mt-2">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen islamic-pattern">
      {/* Header */}
      <header className="sticky top-0 z-20 w-full border-b bg-background/95 backdrop-blur-sm islamic-border">
        <div className="container flex h-16 items-center justify-between px-4 max-w-4xl mx-auto">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80">
            <ArrowLeft className="h-4 w-4" />
            <div className="flex flex-col">
              <h1 className="text-xl font-bold font-calligraphy">Hidayah</h1>
              <p className="text-xs text-muted-foreground">Islamic Guidance AI</p>
            </div>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 mb-4 text-primary">
            <Heart className="w-full h-full" />
          </div>
          <h1 className="text-3xl font-bold mb-2 font-calligraphy text-primary">Support Hidayah</h1>

          <div className="decorative-divider mx-auto w-24 my-4"></div>

          <p className="text-lg mb-8 max-w-2xl">
            Your donations help us maintain and improve Hidayah to provide better Islamic guidance. Every contribution,
            no matter how small, makes a difference.
          </p>

          <div className="bg-muted/50 p-6 rounded-lg mb-8 border border-primary/10 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 font-calligraphy text-primary">Scan to Donate via UPI</h2>

            {/* Preset donation amounts */}
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              <p className="w-full text-sm mb-2">Select an amount:</p>
              {[null, 100, 200, 500, 1000].map((amount, index) => (
                <Button
                  key={index}
                  variant={selectedAmount === amount ? "default" : "outline"}
                  onClick={() => setSelectedAmount(amount)}
                  className={
                    selectedAmount === amount
                      ? ""
                      : "border-primary/20 hover:border-primary/40 text-primary hover:text-primary/80"
                  }
                >
                  {amount === null ? "Any Amount" : `₹${amount}`}
                </Button>
              ))}
            </div>

            <div className="bg-white p-4 rounded-md inline-block mb-4 shadow-sm">
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
              <p className="text-sm font-medium mb-4 text-primary">Selected amount: ₹{selectedAmount}</p>
            )}
          </div>

          <Link href="/">
            <Button
              variant="outline"
              className="border-primary/20 hover:border-primary/40 text-primary hover:text-primary/80"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Home
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-primary/10 py-6 bg-background/95 mosque-silhouette">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Thank you for supporting Hidayah. Your contributions help us continue our mission.
          </p>
        </div>
      </footer>
    </div>
  )
}

