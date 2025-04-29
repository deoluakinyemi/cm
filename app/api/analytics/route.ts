import { type NextRequest, NextResponse } from "next/server"

// This is a simple health check endpoint to verify the analytics API is working
export async function GET(request: NextRequest) {
  return NextResponse.json({ status: "ok", message: "Analytics API is working" })
}
