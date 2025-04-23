import { neon } from "@neondatabase/serverless"

// Create a SQL query executor using the DATABASE_URL environment variable
const sql = neon(process.env.DATABASE_URL!)

/**
 * Execute a SQL query with optional parameters
 * @param query SQL query string with $1, $2, etc. as parameter placeholders
 * @param params Array of parameter values
 * @returns Promise resolving to the query results
 */
export async function executeQuery(query: string, params: any[] = []) {
  try {
    // Use the sql.query method for parameterized queries
    const result = await sql.query(query, params)
    return result.rows
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

/**
 * Execute a SQL query using tagged template literals
 * This is an alternative way to execute queries with the Neon client
 * @param strings Template strings
 * @param values Values to interpolate
 * @returns Promise resolving to the query results
 */
export function sqlTemplate(strings: TemplateStringsArray, ...values: any[]) {
  return sql(strings, ...values)
}
