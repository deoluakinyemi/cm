"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { createReply } from "@/app/actions/forum-actions"

interface ReplyFormProps {
  topicId: string
}

export function ReplyForm({ topicId }: ReplyFormProps) {
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!content.trim()) {
      setError("Reply content cannot be empty")
      return
    }

    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("content", content)
      formData.append("topicId", topicId)

      const result = await createReply(formData)

      if (result.success) {
        setContent("")
        router.refresh()
      } else {
        setError(result.message || "Failed to post reply")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Post a Reply</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Textarea
            placeholder="Write your reply here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="resize-none"
          />
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">You can use HTML for formatting</p>
          <Button type="submit" disabled={isSubmitting} className="bg-emerald-600 hover:bg-emerald-700">
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? "Posting..." : "Post Reply"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
