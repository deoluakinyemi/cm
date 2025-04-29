import { type NextRequest, NextResponse } from "next/server"
import { getAnalyticsData } from "@/lib/kv"

// Simple authentication middleware
const authenticate = (request: NextRequest) => {
  const authHeader = request.headers.get("authorization")

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return false
  }

  // Decode the Base64 credentials
  const base64Credentials = authHeader.split(" ")[1]
  const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8")
  const [username, password] = credentials.split(":")

  // Check against environment variables
  const validUsername = process.env.ADMIN_USERNAME
  const validPassword = process.env.ADMIN_PASSWORD

  // Verify credentials are set and match
  if (!validUsername || !validPassword) {
    console.error("Admin credentials not configured in environment variables")
    return false
  }

  return username === validUsername && password === validPassword
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    if (!authenticate(request)) {
      return new NextResponse(null, {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Admin Analytics"',
        },
      })
    }

    // Get analytics data from KV store
    const analyticsData = await getAnalyticsData()

    // Add a test entry if no data exists
    if (Object.keys(analyticsData.dailyStats).length === 0) {
      const today = new Date().toISOString().split("T")[0]
      analyticsData.dailyStats[today] = {
        uniqueVisitors: 1,
        totalVisits: 1,
        searches: 1,
        searchQueries: { test: 1 },
      }
      analyticsData.visitors[today] = { "test-ip": true }
      analyticsData.searches[today] = {
        "test-ip": [
          {
            query: "test",
            timestamp: new Date().toISOString(),
          },
        ],
      }

      return NextResponse.json({
        message: "No analytics data found, returning test data",
        data: analyticsData,
      })
    }

    return NextResponse.json({
      message: "Current analytics data",
      data: analyticsData,
    })
  } catch (error) {
    console.error("Error retrieving analytics data:", error)
    return NextResponse.json({ error: "Failed to retrieve analytics data" }, { status: 500 })
  }
}
