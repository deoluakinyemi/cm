"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useSearchParams } from "next/navigation"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")

  useEffect(() => {
    // Try to get data from URL parameters (from Google Form redirect)
    const emailParam = searchParams.get("email")
    const nameParam = searchParams.get("name")

    if (emailParam) setEmail(emailParam)
    if (nameParam) setName(nameParam.split(" ")[0]) // Get first name

    // Send confirmation email if we have an email address
    if (emailParam) {
      sendConfirmationEmail(emailParam, nameParam || "")
    }
  }, [searchParams])

  // Function to send confirmation email
  const sendConfirmationEmail = async (email: string, name: string) => {
    // In a real implementation, you would call your backend API to send an email
    console.log(`Sending confirmation email to ${email} for ${name}`)

    // Example of how you might implement this with a server action or API route
    // await fetch('/api/send-confirmation', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, name })
    // })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white py-4 border-b">
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/rida-logo.png" alt="Rida Logo" width={120} height={60} className="h-auto" />
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container max-w-3xl text-center px-4">
          <Card className="p-8 shadow-lg">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h1 className="text-4xl font-bold mb-4">You're Officially on the Radar!</h1>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-2xl font-semibold text-green-600 mb-6">Congratulations{name ? `, ${name}` : ""}!</p>
              <p className="text-lg mb-4">
                You've taken the first step toward becoming a distributor of Nigeria's favorite balm solution.
              </p>
              <p className="text-lg mb-4">
                Our team will review your application based on your city/LGA and reach out to you with the next steps
                for onboarding.
              </p>
              <p className="text-lg font-medium mb-4">
                Note: Due to high demand and location exclusivity, early action will be prioritized.
              </p>
              <p className="text-lg mb-4">Stay tuned — we'll be reaching out soon!</p>
              <p className="text-lg italic mb-6">
                (You'll also receive an email confirming your registration{email ? ` at ${email}` : ""})
              </p>

              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-bold mb-3">What's Next?</h3>
                <ol className="text-left list-decimal pl-6 space-y-2">
                  <li>Our team will review your application within 1-2 business days</li>
                  <li>You'll receive an email with more details about the Rida Balm distribution opportunity</li>
                  <li>We'll schedule a call to discuss territory availability and next steps</li>
                  <li>Upon approval, you'll receive onboarding materials and product information</li>
                </ol>
              </div>
            </div>

            <div className="mt-12 space-y-4">
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href="/opportunity">Learn More About the Opportunity</Link>
              </Button>
              <div>
                <Link href="/" className="text-green-600 hover:text-green-700 inline-block mt-4">
                  Return to Home
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-6">
        <div className="container text-center">
          <div className="flex justify-center mb-4">
            <Image src="/rida-logo.png" alt="Rida Logo" width={80} height={40} className="h-auto" />
          </div>
          <p>© {new Date().getFullYear()} Rida Balm Distributors. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
