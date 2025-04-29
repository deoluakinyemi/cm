import { kv } from "@vercel/kv"

// Analytics data structure
export interface AnalyticsData {
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

// Default empty analytics data
export const defaultAnalyticsData: AnalyticsData = {
  visitors: {},
  searches: {},
  dailyStats: {},
}

// Get analytics data from KV store
export async function getAnalyticsData(): Promise<AnalyticsData> {
  try {
    const data = await kv.get<AnalyticsData>("analytics")
    return data || defaultAnalyticsData
  } catch (error) {
    console.error("Error fetching analytics data from KV:", error)
    return defaultAnalyticsData
  }
}

// Save analytics data to KV store
export async function saveAnalyticsData(data: AnalyticsData): Promise<void> {
  try {
    await kv.set("analytics", data)
  } catch (error) {
    console.error("Error saving analytics data to KV:", error)
  }
}
