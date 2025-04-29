"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  phone: z.string().min(11, {
    message: "Phone number must be at least 11 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  location: z.string().min(2, {
    message: "City & LGA must be at least 2 characters.",
  }),
  investmentRange: z.string({
    required_error: "Please select an investment range.",
  }),
})

export default function WaitlistForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      location: "",
      investmentRange: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Google Form ID from your URL
      const googleFormId = "1hJo5CDGBAq_p9k_6psOgZ5jS1O8V2ASq7iG2A7R1FSw"

      // Method 1: Direct form submission (most reliable)
      // This opens the Google Form in a new tab and auto-fills the values
      const formUrl = new URL(`https://docs.google.com/forms/d/e/${googleFormId}/viewform`)

      // Add form data as URL parameters
      // These use the actual entry IDs from the Google Form
      formUrl.searchParams.append("entry.1234567890", values.fullName) // Replace with actual entry ID
      formUrl.searchParams.append("entry.1234567891", values.phone) // Replace with actual entry ID
      formUrl.searchParams.append("entry.1234567892", values.email) // Replace with actual entry ID
      formUrl.searchParams.append("entry.1234567893", values.location) // Replace with actual entry ID
      formUrl.searchParams.append("entry.1234567894", values.investmentRange) // Replace with actual entry ID

      // Store the form data in localStorage for backup
      localStorage.setItem("formData", JSON.stringify(values))

      // Method 2: Alternative approach - redirect to thank you page and open form in new tab
      router.push("/thank-you")

      // Open the pre-filled form in a new tab
      window.open(formUrl.toString(), "_blank")
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitError("There was an error submitting your form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name *</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number *</FormLabel>
              <FormControl>
                <Input placeholder="08012345678" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address *</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City & Local Government Area (LGA) *</FormLabel>
              <FormControl>
                <Input placeholder="Lagos, Ikeja" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="investmentRange"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Available Investment Range *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="₦300,000" id="r1" />
                    <Label htmlFor="r1">₦300,000</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="₦500,000" id="r2" />
                    <Label htmlFor="r2">₦500,000</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="₦1,000,000" id="r3" />
                    <Label htmlFor="r3">₦1,000,000</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="₦1,000,000+" id="r4" />
                    <Label htmlFor="r4">₦1,000,000+</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {submitError && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{submitError}</div>}

        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-lg py-6" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : "Join the Rida Distributor Waitlist Now"}
        </Button>
      </form>
    </Form>
  )
}
