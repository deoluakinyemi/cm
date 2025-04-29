"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function FindFormIds() {
  const [formIds, setFormIds] = useState<string[]>([])
  const [formUrl, setFormUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const findIds = async () => {
    setIsLoading(true)
    setError("")
    setFormIds([])

    try {
      // This is a demonstration - in a real app, you'd need a server component or API route
      // to fetch the form HTML since client-side requests will be blocked by CORS
      const response = await fetch(formUrl)
      const html = await response.text()

      // Find all entry IDs in the form
      const regex = /entry\.(\d+)/g
      const matches = html.match(regex) || []
      const uniqueMatches = [...new Set(matches)]

      setFormIds(uniqueMatches)
    } catch (err) {
      setError("Could not fetch form data. CORS restrictions likely prevented access.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Find Google Form Entry IDs</CardTitle>
        <CardDescription>Enter your Google Form URL to find the entry IDs needed for form integration.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="form-url" className="text-sm font-medium">
              Google Form URL
            </label>
            <input
              id="form-url"
              type="url"
              className="w-full p-2 border rounded-md"
              placeholder="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform"
              value={formUrl}
              onChange={(e) => setFormUrl(e.target.value)}
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          {formIds.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Found Entry IDs:</h3>
              <ul className="bg-gray-50 p-3 rounded-md text-sm">
                {formIds.map((id, index) => (
                  <li key={index} className="font-mono">
                    {id}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={findIds} disabled={isLoading || !formUrl} className="w-full">
          {isLoading ? "Searching..." : "Find Entry IDs"}
        </Button>
      </CardFooter>
    </Card>
  )
}
