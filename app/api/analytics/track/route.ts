import { type NextRequest, NextResponse } from "next/server"
import { getAnalyticsData, saveAnalyticsData } from "@/lib/analytics-storage"

export async function POST(request: NextRequest) {
  try {
    const { type, query } = await request.json()

    // Get IP address
    const forwardedFor = request.headers.get("x-forwarded-for")
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown"

    // Get current date as YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0]

    // Get existing analytics data
    const analyticsData = await getAnalyticsData()

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

      // Track unique visitor
      if (!analyticsData.visitors[today]) {
        analyticsData.visitors[today] = {}
      }

      if (!analyticsData.visitors[today][ip]) {
        analyticsData.visitors[today][ip] = true
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

      // Track searches by IP
      if (!analyticsData.searches[today]) {
        analyticsData.searches[today] = {}
      }

      if (!analyticsData.searches[today][ip]) {
        analyticsData.searches[today][ip] = []
      }
      analyticsData.searches[today][ip].push({
        query,
        timestamp: new Date().toISOString(),
      })
    }

    // Save updated analytics data
    await saveAnalyticsData(analyticsData)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error tracking analytics:", error)
    return NextResponse.json({ success: false, error: "Failed to track analytics" }, { status: 500 })
  }
}
