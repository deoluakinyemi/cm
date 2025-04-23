"use server"

import { executeQuery } from "@/lib/db"
import { getCurrentUser } from "./auth-actions"
import { revalidatePath } from "next/cache"

// Get all forum categories
export async function getForumCategories() {
  try {
    // Simplified query that doesn't rely on the category_id column
    const categories = await executeQuery("SELECT * FROM forum_categories ORDER BY order_num ASC")

    // Ensure categories is an array, even if the query returned undefined or null
    const categoriesArray = Array.isArray(categories) ? categories : []

    // For each category, get the topic count in a separate query
    const categoriesWithCounts = await Promise.all(
      categoriesArray.map(async (category) => {
        try {
          const topicCountResult = await executeQuery(
            "SELECT COUNT(*) as topic_count FROM forum_topics WHERE category_id = $1",
            [category.id],
          )

          const topicCount =
            topicCountResult && topicCountResult[0] ? Number.parseInt(topicCountResult[0].topic_count) : 0

          return {
            ...category,
            topic_count: topicCount,
          }
        } catch (error) {
          console.error(`Error getting topic count for category ${category.id}:`, error)
          return {
            ...category,
            topic_count: 0,
          }
        }
      }),
    )

    return { success: true, categories: categoriesWithCounts }
  } catch (error) {
    console.error("Error fetching forum categories:", error)
    return { success: false, message: "Failed to fetch forum categories", categories: [] }
  }
}

// Get topics for a specific category
export async function getCategoryTopics(categorySlug: string) {
  try {
    const category = await executeQuery("SELECT * FROM forum_categories WHERE slug = $1", [categorySlug])

    const categoryArray = Array.isArray(category) ? category : []

    if (categoryArray.length === 0) {
      return { success: false, message: "Category not found" }
    }

    const topics = await executeQuery(
      `SELECT t.*, u.name as author_name, 
       (SELECT COUNT(*) FROM forum_replies WHERE topic_id = t.id) as reply_count
       FROM forum_topics t 
       JOIN users u ON t.author_id = u.id
       WHERE t.category_id = $1
       ORDER BY t.is_pinned DESC, t.created_at DESC`,
      [categoryArray[0].id],
    )

    const topicsArray = Array.isArray(topics) ? topics : []

    return { success: true, category: categoryArray[0], topics: topicsArray }
  } catch (error) {
    console.error("Error fetching category topics:", error)
    return { success: false, message: "Failed to fetch topics" }
  }
}

// Get a single topic with its replies
export async function getTopic(topicSlug: string) {
  try {
    // Increment view count
    await executeQuery("UPDATE forum_topics SET view_count = view_count + 1 WHERE slug = $1", [topicSlug])

    const topics = await executeQuery(
      `SELECT t.*, c.name as category_name, c.slug as category_slug, u.name as author_name
       FROM forum_topics t 
       JOIN forum_categories c ON t.category_id = c.id
       JOIN users u ON t.author_id = u.id
       WHERE t.slug = $1`,
      [topicSlug],
    )

    const topicsArray = Array.isArray(topics) ? topics : []

    if (topicsArray.length === 0) {
      return { success: false, message: "Topic not found" }
    }

    const topic = topicsArray[0]

    const replies = await executeQuery(
      `SELECT r.*, u.name as author_name
       FROM forum_replies r
       JOIN users u ON r.author_id = u.id
       WHERE r.topic_id = $1
       ORDER BY r.created_at ASC`,
      [topic.id],
    )

    const repliesArray = Array.isArray(replies) ? replies : []

    return { success: true, topic, replies: repliesArray }
  } catch (error) {
    console.error("Error fetching topic:", error)
    return { success: false, message: "Failed to fetch topic" }
  }
}

// Create a new topic
export async function createTopic(formData: FormData) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return { success: false, message: "You must be logged in to create a topic" }
    }

    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const categoryId = formData.get("categoryId") as string

    if (!title || !content || !categoryId) {
      return { success: false, message: "All fields are required" }
    }

    // Create slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")

    // Check if slug already exists
    const existingSlugs = await executeQuery("SELECT slug FROM forum_topics WHERE slug = $1", [slug])
    const existingSlugsArray = Array.isArray(existingSlugs) ? existingSlugs : []

    if (existingSlugsArray.length > 0) {
      return { success: false, message: "A topic with a similar title already exists" }
    }

    const result = await executeQuery(
      `INSERT INTO forum_topics (title, slug, content, category_id, author_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, slug`,
      [title, slug, content, categoryId, user.id],
    )

    const resultArray = Array.isArray(result) ? result : []

    revalidatePath("/community/forum")

    if (resultArray.length === 0) {
      return { success: false, message: "Failed to create topic" }
    }

    return { success: true, topicId: resultArray[0].id, slug: resultArray[0].slug }
  } catch (error) {
    console.error("Error creating topic:", error)
    return { success: false, message: "Failed to create topic" }
  }
}

// Create a reply to a topic
export async function createReply(formData: FormData) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return { success: false, message: "You must be logged in to reply" }
    }

    const content = formData.get("content") as string
    const topicId = formData.get("topicId") as string

    if (!content || !topicId) {
      return { success: false, message: "All fields are required" }
    }

    await executeQuery(
      `INSERT INTO forum_replies (content, topic_id, author_id)
       VALUES ($1, $2, $3)`,
      [content, topicId, user.id],
    )

    // Update the topic's updated_at timestamp
    await executeQuery("UPDATE forum_topics SET updated_at = CURRENT_TIMESTAMP WHERE id = $1", [topicId])

    // Get the topic slug for redirection
    const topics = await executeQuery("SELECT slug FROM forum_topics WHERE id = $1", [topicId])
    const topicsArray = Array.isArray(topics) ? topics : []

    if (topicsArray.length === 0) {
      return { success: false, message: "Topic not found" }
    }

    revalidatePath(`/community/forum/topic/${topicsArray[0].slug}`)

    return { success: true, topicSlug: topicsArray[0].slug }
  } catch (error) {
    console.error("Error creating reply:", error)
    return { success: false, message: "Failed to create reply" }
  }
}
