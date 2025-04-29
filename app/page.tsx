"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { candidateData } from "@/lib/data"
import Image from "next/image"

// Simple client-side analytics for preview mode
interface AnalyticsData {
  visitors: Record<string, Record<string, boolean>>
  searches: Record<string, Record<string, Array<{ query: string; timestamp: string }>>>
  dailyStats: Record<
    string,
    {
      uniqueVisitors: number
      totalVisits: number
      searches: number
      searchQueries: Record<string, number>
    }
  >
}

// Function to track analytics client-side as fallback
const trackClientSide = (type: "visit" | "search", query?: string) => {
  try {
    // Get current date as YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0]

    // Get existing data from localStorage or initialize
    let analyticsData: AnalyticsData
    const storedData = localStorage.getItem("analytics-data")

    if (storedData) {
      analyticsData = JSON.parse(storedData)
    } else {
      analyticsData = {
        visitors: {},
        searches: {},
        dailyStats: {},
      }
    }

    // Initialize today's data if it doesn't exist
    if (!analyticsData.dailyStats[today]) {
      analyticsData.dailyStats[today] = {
        uniqueVisitors: 0,
        totalVisits: 0,
        searches: 0,
        searchQueries: {},
      }
    }

    // Track visitor
    if (type === "visit") {
      // Increment total visits
      analyticsData.dailyStats[today].totalVisits++

      // Use a client ID from localStorage
      let clientId = localStorage.getItem("client-id")
      if (!clientId) {
        clientId = `client-${Math.random().toString(36).substring(2, 15)}`
        localStorage.setItem("client-id", clientId)
      }

      // Track unique visitor
      if (!analyticsData.visitors[today]) {
        analyticsData.visitors[today] = {}
      }

      if (!analyticsData.visitors[today][clientId]) {
        analyticsData.visitors[today][clientId] = true
        analyticsData.dailyStats[today].uniqueVisitors++
      }
    }

    // Track search
    if (type === "search" && query) {
      // Increment total searches
      analyticsData.dailyStats[today].searches++

      // Track search query
      if (!analyticsData.dailyStats[today].searchQueries[query]) {
        analyticsData.dailyStats[today].searchQueries[query] = 0
      }
      analyticsData.dailyStats[today].searchQueries[query]++

      // Use a client ID from localStorage
      let clientId = localStorage.getItem("client-id")
      if (!clientId) {
        clientId = `client-${Math.random().toString(36).substring(2, 15)}`
        localStorage.setItem("client-id", clientId)
      }

      // Track searches by client ID
      if (!analyticsData.searches[today]) {
        analyticsData.searches[today] = {}
      }

      if (!analyticsData.searches[today][clientId]) {
        analyticsData.searches[today][clientId] = []
      }

      analyticsData.searches[today][clientId].push({
        query,
        timestamp: new Date().toISOString(),
      })
    }

    // Save updated data
    localStorage.setItem("analytics-data", JSON.stringify(analyticsData))
  } catch (error) {
    console.error("Error tracking client-side analytics:", error)
  }
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Array<{ id: number; name: string; result: string }>>([])
  const [searched, setSearched] = useState(false)
  const [isTracking, setIsTracking] = useState(false)

  // Track page visit on component mount
  useEffect(() => {
    const trackVisit = async () => {
      try {
        setIsTracking(true)

        // Try server-side tracking first
        const response = await fetch("/api/analytics/track", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ type: "visit" }),
        })

        if (!response.ok) {
          // Fall back to client-side tracking
          console.warn("Server-side tracking failed, using client-side fallback")
          trackClientSide("visit")
        }
      } catch (error) {
        console.error("Error tracking visit:", error)
        // Fall back to client-side tracking
        trackClientSide("visit")
      } finally {
        setIsTracking(false)
      }
    }

    trackVisit()
  }, [])

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      setSearched(false)
      return
    }

    const queryTerms = searchQuery.toLowerCase().trim().split(/\s+/)

    const results = candidateData.filter((candidate) => {
      const candidateNameWords = candidate.name.toLowerCase().split(/\s+/)

      // Check if each query term matches at least one complete word in the candidate's name
      return queryTerms.every((term) =>
        candidateNameWords.some(
          (word) =>
            word === term ||
            // Allow matching if the term is at least 3 characters and is a complete match to the start of a name
            (term.length >= 3 && word.startsWith(term)),
        ),
      )
    })

    setSearchResults(results)
    setSearched(true)

    // Track search
    try {
      const response = await fetch("/api/analytics/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "search",
          query: searchQuery.trim(),
        }),
      })

      if (!response.ok) {
        // Fall back to client-side tracking
        console.warn("Server-side search tracking failed, using client-side fallback")
        trackClientSide("search", searchQuery.trim())
      }
    } catch (error) {
      console.error("Error tracking search:", error)
      // Fall back to client-side tracking
      trackClientSide("search", searchQuery.trim())
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 md:p-24">
      <div className="mb-8 flex justify-center">
        <Image src="/images/coachb-logo.png" alt="CoachB Logo" width={150} height={80} priority />
      </div>
      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl">Assessment Results Portal</CardTitle>
          <CardDescription>Enter your name or surname to check your second assessment result</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-2">
            <Input
              placeholder="Search by name or surname..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch} className="gap-2">
              <Search size={18} />
              <span>Search</span>
            </Button>
          </div>

          {searched && (
            <div className="mt-6">
              {searchResults.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="font-medium text-sm text-muted-foreground">
                    Found {searchResults.length} result{searchResults.length !== 1 ? "s" : ""}
                  </h3>
                  <div className="border rounded-lg divide-y">
                    {searchResults.map((candidate) => (
                      <div key={candidate.id} className="p-4 flex justify-between items-center">
                        <div>
                          <p className="font-medium">{candidate.name}</p>
                          <p className="text-sm text-muted-foreground">Candidate Rank: {candidate.id}</p>
                        </div>
                        <Badge
                          variant={candidate.result === "Above Cutoff" ? "success" : "destructive"}
                          className={
                            candidate.result === "Above Cutoff"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                          }
                        >
                          {candidate.result}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-6 text-center p-6 border rounded-lg">
                  <h3 className="font-medium">No results found</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Please check the spelling or try a different name
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6">
          <p className="text-sm text-muted-foreground text-center">
            This is the official portal for the second assessment results. If you have any questions, please contact
            hr@coachb.io
          </p>
        </CardFooter>
      </Card>
    </main>
  )
}
