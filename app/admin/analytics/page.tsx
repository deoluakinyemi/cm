"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import Image from "next/image"

// Function to get client-side analytics data
const getClientAnalyticsData = () => {
  if (typeof window === "undefined") return null

  try {
    const storedData = localStorage.getItem("analytics-data")
    if (storedData) {
      return JSON.parse(storedData)
    }
  } catch (error) {
    console.error("Error getting client analytics data:", error)
  }

  return null
}

export default function AdminAnalytics() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [analyticsData, setAnalyticsData] = useState<any>({
    visitors: {},
    searches: {},
    dailyStats: {},
  })
  const [error, setError] = useState("")
  const [usingClientData, setUsingClientData] = useState(false)
  const router = useRouter()

  // Function to fetch analytics data
  const fetchAnalyticsData = async () => {
    try {
      setIsLoading(true)
      setError("") // Clear any previous errors

      // Try to get server-side data
      const response = await fetch("/api/analytics/data", {
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
      })

      if (response.status === 401) {
        setIsAuthenticated(false)
        setError("Invalid credentials. Please try again.")
        setIsLoading(false)
        return
      }

      if (!response.ok) {
        // Try to get client-side data as fallback
        const clientData = getClientAnalyticsData()

        if (clientData) {
          setAnalyticsData(clientData)
          setIsAuthenticated(true)
          setUsingClientData(true)
          setError("")
          setIsLoading(false)
          return
        }

        const errorText = await response.text()
        throw new Error(`Failed to fetch analytics data: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      setAnalyticsData(data)
      setIsAuthenticated(true)
      setUsingClientData(false)
      setError("")
    } catch (error) {
      console.error("Error fetching analytics:", error)

      // Try to get client-side data as fallback
      const clientData = getClientAnalyticsData()

      if (clientData) {
        setAnalyticsData(clientData)
        setIsAuthenticated(true)
        setUsingClientData(true)
        setError("")
      } else {
        setError(`${error instanceof Error ? error.message : "Failed to fetch analytics data"}`)
        setIsAuthenticated(false)
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Handle login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    fetchAnalyticsData()
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  // Get sorted dates
  const getSortedDates = () => {
    if (!analyticsData?.dailyStats) return []
    return Object.keys(analyticsData.dailyStats).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
  }

  // Get total unique visitors
  const getTotalUniqueVisitors = () => {
    if (!analyticsData?.dailyStats) return 0
    return Object.values(analyticsData.dailyStats).reduce((total: number, day: any) => total + day.uniqueVisitors, 0)
  }

  // Get total searches
  const getTotalSearches = () => {
    if (!analyticsData?.dailyStats) return 0
    return Object.values(analyticsData.dailyStats).reduce((total: number, day: any) => total + day.searches, 0)
  }

  // Get top search queries
  const getTopSearchQueries = () => {
    if (!analyticsData?.dailyStats) return []

    const queries: Record<string, number> = {}

    Object.values(analyticsData.dailyStats).forEach((day: any) => {
      if (day.searchQueries) {
        Object.entries(day.searchQueries).forEach(([query, count]: [string, any]) => {
          queries[query] = (queries[query] || 0) + count
        })
      }
    })

    return Object.entries(queries)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <div className="mb-8 flex justify-center">
        <Image src="/images/coachb-logo.png" alt="CoachB Logo" width={150} height={80} priority />
      </div>

      {!isAuthenticated ? (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Enter your credentials to view analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">
                  Username
                </label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Loading..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="w-full max-w-6xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <div className="flex items-center gap-4">
              {usingClientData && (
                <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-md">
                  Using browser data (preview mode)
                </div>
              )}
              <Button variant="outline" onClick={() => router.push("/")}>
                Back to Site
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Unique Visitors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{getTotalUniqueVisitors()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Searches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{getTotalSearches()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Days Tracked</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{getSortedDates().length}</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="daily">
            <TabsList className="mb-4">
              <TabsTrigger value="daily">Daily Stats</TabsTrigger>
              <TabsTrigger value="searches">Top Searches</TabsTrigger>
            </TabsList>

            <TabsContent value="daily">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Statistics</CardTitle>
                  <CardDescription>Visitor and search data by day</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="text-left p-3 font-medium">Date</th>
                          <th className="text-left p-3 font-medium">Unique Visitors</th>
                          <th className="text-left p-3 font-medium">Total Visits</th>
                          <th className="text-left p-3 font-medium">Searches</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getSortedDates().map((date) => (
                          <tr key={date} className="border-t">
                            <td className="p-3">{formatDate(date)}</td>
                            <td className="p-3">{analyticsData.dailyStats[date].uniqueVisitors}</td>
                            <td className="p-3">{analyticsData.dailyStats[date].totalVisits}</td>
                            <td className="p-3">{analyticsData.dailyStats[date].searches}</td>
                          </tr>
                        ))}
                        {getSortedDates().length === 0 && (
                          <tr>
                            <td colSpan={4} className="p-3 text-center text-muted-foreground">
                              No data available yet
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="searches">
              <Card>
                <CardHeader>
                  <CardTitle>Top Search Queries</CardTitle>
                  <CardDescription>Most common search terms</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="text-left p-3 font-medium">Query</th>
                          <th className="text-left p-3 font-medium">Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getTopSearchQueries().map(([query, count]) => (
                          <tr key={query} className="border-t">
                            <td className="p-3">{query}</td>
                            <td className="p-3">{count}</td>
                          </tr>
                        ))}
                        {getTopSearchQueries().length === 0 && (
                          <tr>
                            <td colSpan={2} className="p-3 text-center text-muted-foreground">
                              No search data available yet
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </main>
  )
}
