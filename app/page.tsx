import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function Home() {
  // Google Form URL
  const googleFormUrl = "https://docs.google.com/forms/d/1hJo5CDGBAq_p9k_6psOgZ5jS1O8V2ASq7iG2A7R1FSw/viewform"

  return (
    <div className="flex min-h-screen flex-col">
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
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-green-50 to-white py-16 md:py-24">
          <div className="container grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Own the Rida Balm Opportunity in Your City.
                <span className="text-green-600"> Turn ₦1 Million into ₦5M–₦22M+ within 12 months.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700">
                Join the Waitlist to Become a Rida Balm Distributor in Your Local Government Area.
              </p>
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-lg">
                <a href={googleFormUrl} target="_blank" rel="noopener noreferrer">
                  Join the Rida Distributor Waitlist Now
                </a>
              </Button>
            </div>
            <div className="relative rounded-xl overflow-hidden bg-white p-4 shadow-md">
              <Image
                src="/rida-balm-hero.gif"
                alt="Rida Balm Products - For cold, cramps, aches and pains"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Opening Paragraph */}
        <section className="py-12 bg-white">
          <div className="container max-w-3xl">
            <p className="text-lg md:text-xl text-center leading-relaxed">
              Rida is expanding — and we're looking for entrepreneurial, forward-thinking partners to lead the movement
              across cities and local governments.
            </p>
            <p className="text-lg md:text-xl text-center leading-relaxed mt-4">
              If you've ever dreamed of building a real business, growing real wealth, and distributing products that
              people already love, this is your opportunity.
            </p>
            <p className="text-lg md:text-xl text-center leading-relaxed mt-4">
              With a proven product range and massive demand, Rida distributors are positioned for high-profit,
              high-impact returns.
            </p>
            <p className="text-lg md:text-xl text-center font-semibold mt-4">
              Slots are limited by location. Reserve your spot now.
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 bg-gray-50">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-8">Why Join the Rida Balm Distribution Waitlist?</h2>
            <div className="grid gap-4">
              <BenefitItem title="Established Brand" description="Proven products with high demand." />
              <BenefitItem title="Low Barrier, High Upside" description="Invest from ₦300,000 to ₦1,000,000+" />
              <BenefitItem title="Real ROI Potential" description="Earn ₦5 Million – ₦22 Million+ within 12 months." />
              <BenefitItem
                title="Local Territory Advantage"
                description="First come, first served per local government."
              />
              <BenefitItem
                title="Marketing Support"
                description="Starter kits, training, and marketing assets provided."
              />
              <BenefitItem title="Flexible Growth" description="Build retail networks or focus on key partnerships." />
              <BenefitItem
                title="Be Part of a National Movement"
                description="Expand with a brand committed to empowerment."
              />
            </div>
          </div>
        </section>

        {/* Numbers Section */}
        <section className="py-16 bg-green-600 text-white">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-10">The Numbers That Matter:</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <Card className="bg-white/10 backdrop-blur border-white/20 p-6">
                <h3 className="text-4xl font-bold mb-2">₦300k - ₦1M+</h3>
                <p className="text-lg">Starting Investment Range</p>
              </Card>
              <Card className="bg-white/10 backdrop-blur border-white/20 p-6">
                <h3 className="text-4xl font-bold mb-2">Up to 500%+</h3>
                <p className="text-lg">Potential Return in 12 Months</p>
              </Card>
              <Card className="bg-white/10 backdrop-blur border-white/20 p-6">
                <h3 className="text-4xl font-bold mb-2">500,000+</h3>
                <p className="text-lg">Active Customers already love Rida products</p>
              </Card>
            </div>
            <p className="text-xl text-center mt-10">Build a business you can be proud of. Start with Rida.</p>
          </div>
        </section>

        {/* CTA Section (replacing the form section) */}
        <section id="waitlist" className="py-16 bg-white">
          <div className="container max-w-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Join the Rida Distributor Waitlist?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Fill out our quick form to secure your spot in your local area. Slots are limited and filling fast!
            </p>
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-6">
              <a href={googleFormUrl} target="_blank" rel="noopener noreferrer">
                Join the Waitlist Now
              </a>
            </Button>
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

function BenefitItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
      <div className="text-green-600 mt-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
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
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )
}
