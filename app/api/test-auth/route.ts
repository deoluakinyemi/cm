import { type NextRequest, NextResponse } from "next/server"

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
  // Check authentication
  if (!authenticate(request)) {
    return new NextResponse(null, {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Admin Authentication"',
      },
    })
  }

  // Return success if authenticated
  return NextResponse.json({
    success: true,
    message: "Authentication successful",
  })
}
