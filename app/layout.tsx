import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Interview Status Checker | CoachB",
  description: "Check your second assessment results - Powered by CoachB",
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/images/coachb-logo.png", type: "image/png" }],
    apple: "/images/coachb-logo.png",
  },
  openGraph: {
    title: "Interview Status Checker | CoachB",
    description: "Check your second assessment results - Powered by CoachB",
    type: "website",
    siteName: "CoachB Assessment Portal",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "CoachB Assessment Portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interview Status Checker | CoachB",
    description: "Check your second assessment results - Powered by CoachB",
    images: ["/images/og-image.png"],
  },
  authors: [{ name: "CoachB" }],
  creator: "CoachB",
  publisher: "CoachB",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
