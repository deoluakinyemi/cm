import Link from "next/link"
import { ArrowLeft, PiggyBank } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getTopic } from "@/app/actions/forum-actions"
import { ReplyForm } from "@/components/forum/reply-form"

export default async function TopicPage({ params }: { params: { slug: string } }) {
  const { success, topic, replies, message } = await getTopic(params.slug)

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <PiggyBank className="h-6 w-6 text-emerald-600" />
            <span className="text-xl font-bold">NairaWise</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Home
            </Link>
            <Link
              href="/learn"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Learn
            </Link>
            <Link
              href="/tools"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Tools
            </Link>
            <Link href="/community" className="text-sm font-medium transition-colors hover:text-primary">
              Community
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden md:flex" asChild>
              <Link href="/auth/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex items-center mb-8">
            <Button variant="outline" size="icon" asChild>
              <Link href={success ? `/community/forum/category/${topic.category_slug}` : "/community/forum"}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to category</span>
              </Link>
            </Button>
            {success ? (
              <div className="ml-4">
                <h1 className="text-3xl font-bold">{topic.title}</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Link href={`/community/forum/category/${topic.category_slug}`} className="hover:underline">
                    {topic.category_name}
                  </Link>
                  <span>•</span>
                  <span>{topic.view_count} views</span>
                  {topic.is_locked && <Badge variant="outline">Locked</Badge>}
                </div>
              </div>
            ) : (
              <h1 className="ml-4 text-3xl font-bold">Topic</h1>
            )}
          </div>

          {!success ? (
            <div className="rounded-lg border p-8 text-center">
              <p className="text-muted-foreground">{message || "Failed to load topic"}</p>
            </div>
          ) : (
            <div className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-start gap-4 pb-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt={topic.author_name} />
                    <AvatarFallback>
                      {topic.author_name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold">{topic.author_name}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(topic.created_at), { addSuffix: true })}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">Original poster</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: topic.content }} />
                </CardContent>
              </Card>

              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Replies ({replies.length})</h2>
              </div>

              {replies.length === 0 ? (
                <div className="rounded-lg border p-8 text-center">
                  <p className="text-muted-foreground">No replies yet. Be the first to reply!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {replies.map((reply) => (
                    <Card key={reply.id}>
                      <CardHeader className="flex flex-row items-start gap-4 pb-2">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt={reply.author_name} />
                          <AvatarFallback>
                            {reply.author_name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="font-semibold">{reply.author_name}</div>
                            <div className="text-sm text-muted-foreground">
                              {formatDistanceToNow(new Date(reply.created_at), { addSuffix: true })}
                            </div>
                          </div>
                          {reply.is_solution && (
                            <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                              Solution
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: reply.content }} />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {!topic.is_locked && <ReplyForm topicId={topic.id} />}

              {topic.is_locked && (
                <div className="rounded-lg bg-amber-50 p-4 text-amber-800 border border-amber-200">
                  <p className="text-center">This topic is locked. New replies are not allowed.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <PiggyBank className="h-5 w-5 text-emerald-600" />
            <p className="text-sm text-muted-foreground">© 2023 NairaWise. All rights reserved.</p>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
