import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function OpportunityPage() {
  // Google Form URL
  const googleFormUrl = "https://docs.google.com/forms/d/1hJo5CDGBAq_p9k_6psOgZ5jS1O8V2ASq7iG2A7R1FSw/viewform"

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white py-4 border-b">
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/rida-logo.png" alt="Rida Logo" width={120} height={60} className="h-auto" />
          </Link>
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <a href={googleFormUrl} target="_blank" rel="noopener noreferrer">
              Join Waitlist
            </a>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-16 bg-gradient-to-b from-green-50 to-white">
          <div className="container max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
              Here's How Rida Distributors Are Winning Across Nigeria
            </h1>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-green-600">What You're Getting</h3>
                <p className="text-gray-700">Distributor access to Rida Balm at wholesale rates.</p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-green-600">How You Profit</h3>
                <p className="text-gray-700">Sell at retail prices OR build sub distributors under you.</p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-green-600">Your Investment</h3>
                <p className="text-gray-700">Choose a starting level between ₦300k and ₦1M+</p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-green-600">Your Growth Potential</h3>
                <p className="text-gray-700">
                  Sell, restock, and expand your territory with bonuses and brand support.
                </p>
              </Card>
            </div>

            <p className="text-xl text-center font-semibold mb-12">
              This isn't just buying products. It's building a scalable business.
            </p>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center">
                <div className="flex-1">
                  <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold">Invest</h3>
                </div>

                <div className="text-green-600">➔</div>

                <div className="flex-1">
                  <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 11 3 3L22 4"></path>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold">Sell</h3>
                </div>

                <div className="text-green-600">➔</div>

                <div className="flex-1">
                  <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                      <path d="M13.5 1.5 12 3l1.5 1.5"></path>
                      <path d="M21 11.5 19.5 13l-1.5-1.5"></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold">Grow</h3>
                </div>

                <div className="text-green-600">➔</div>

                <div className="flex-1">
                  <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 20h.01"></path>
                      <path d="M7 20v-4"></path>
                      <path d="M12 20v-8"></path>
                      <path d="M17 20V8"></path>
                      <path d="M22 4v16"></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold">Earn</h3>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                <a href={googleFormUrl} target="_blank" rel="noopener noreferrer">
                  Join the Waitlist Now
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">How soon can I start after joining the waitlist?</h3>
                <p className="text-gray-700">
                  Once your application is reviewed and approved, we'll contact you within 1-2 weeks to begin the
                  onboarding process.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Is my local government area still available?</h3>
                <p className="text-gray-700">
                  Availability varies by location. We prioritize applications on a first-come, first-served basis, which
                  is why joining the waitlist early is important.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">What support will I receive as a distributor?</h3>
                <p className="text-gray-700">
                  You'll receive comprehensive training, marketing materials, business development support, and ongoing
                  mentorship to help you succeed.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">How quickly can I expect to see returns?</h3>
                <p className="text-gray-700">
                  While results vary based on your effort and market, many distributors begin seeing positive returns
                  within the first 3-6 months, with significant growth potential over 12 months.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container text-center">
          <div className="flex justify-center mb-6">
            <Image src="/rida-logo.png" alt="Rida Logo" width={100} height={50} className="h-auto" />
          </div>
          <p>© {new Date().getFullYear()} Rida Balm Distributors. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-4">
            <Link href="#" className="hover:text-green-400">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-green-400">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-green-400">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
