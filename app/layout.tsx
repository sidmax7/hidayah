import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Providers } from "@/components/providers"
import JsonLd from '@/app/components/JsonLd'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Hidayah - Islamic Guidance Chat",
  description: "Chat with an AI Imam for guidance on Islamic education and principles",
  keywords: ["Islamic guidance", "AI Imam", "Islamic education", "Islamic principles", "Muslim chat", "Islamic Q&A"],
  authors: [{ name: "Hidayah Team" }],
  creator: "Hidayah",
  publisher: "Hidayah",
  metadataBase: new URL("https://www.hidayah.co.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Hidayah - Islamic Guidance Chat",
    description: "Chat with an AI Imam for guidance on Islamic education and principles",
    url: "https://www.hidayah.co.in",
    siteName: "Hidayah",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.hidayah.co.in/og-image.jpg", // Create this image
        width: 1200,
        height: 630,
        alt: "Hidayah - Islamic Guidance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hidayah - Islamic Guidance Chat",
    description: "Chat with an AI Imam for guidance on Islamic education and principles",
    images: ["https://www.hidayah.co.in/og-image.jpg"], // Same as OG image
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

