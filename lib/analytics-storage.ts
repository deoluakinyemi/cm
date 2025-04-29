// Define analytics data structure
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

// In-memory fallback storage
let inMemoryStorage: AnalyticsData = { ...defaultAnalyticsData }

// Check if we're in a browser environment
const isBrowser = typeof window !== "undefined"

// Get analytics data
export async function getAnalyticsData(): Promise<AnalyticsData> {
  try {
    // Try to get from localStorage in browser environment (for development/preview)
    if (isBrowser) {
      const storedData = localStorage.getItem("analytics-data")
      if (storedData) {
        return JSON.parse(storedData)
      }
    }

    // Return in-memory data as fallback
    return inMemoryStorage
  } catch (error) {
    console.error("Error fetching analytics data:", error)
    return { ...defaultAnalyticsData }
  }
}

// Save analytics data
export async function saveAnalyticsData(data: AnalyticsData): Promise<void> {
  try {
    // Save to localStorage in browser environment (for development/preview)
    if (isBrowser) {
      localStorage.setItem("analytics-data", JSON.stringify(data))
    }

    // Save to in-memory storage as fallback
    inMemoryStorage = { ...data }
  } catch (error) {
    console.error("Error saving analytics data:", error)
  }
}
