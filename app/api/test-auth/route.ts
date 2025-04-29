import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  // Get environment variables
  const adminUsername = process.env.ADMIN_USERNAME
  const adminPassword = process.env.ADMIN_PASSWORD

  // Return status of environment variables (without revealing actual values)
  return NextResponse.json({
    usernameSet: !!adminUsername,
    passwordSet: !!adminPassword,
    message: "This endpoint checks if authentication environment variables are properly set",
  })
}
