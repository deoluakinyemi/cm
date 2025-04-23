import Link from "next/link"
import { ArrowLeft, Clock, MessageSquare, PiggyBank, Plus } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getCategoryTopics } from "@/app/actions/forum-actions"

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { success, category, topics, message } = await getCategoryTopics(params.slug)

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
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Button variant="outline" size="icon" asChild>
                <Link href="/community/forum">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Back to forums</span>
                </Link>
              </Button>
              {success ? (
                <h1 className="ml-4 text-3xl font-bold">{category.name}</h1>
              ) : (
                <h1 className="ml-4 text-3xl font-bold">Forum Category</h1>
              )}
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
              <Link href={`/community/forum/new-topic?category=${params.slug}`}>
                <Plus className="mr-2 h-4 w-4" />
                New Topic
              </Link>
            </Button>
          </div>

          {!success ? (
            <div className="rounded-lg border p-8 text-center">
              <p className="text-muted-foreground">{message || "Failed to load topics"}</p>
            </div>
          ) : (
            <>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
              </Card>

              {topics.length === 0 ? (
                <div className="rounded-lg border p-8 text-center">
                  <p className="text-muted-foreground">No topics have been created in this category yet.</p>
                  <Button className="mt-4" asChild>
                    <Link href={`/community/forum/new-topic?category=${params.slug}`}>Create the first topic</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid gap-4">
                  {topics.map((topic) => (
                    <Card key={topic.id} className="overflow-hidden">
                      <Link href={`/community/forum/topic/${topic.slug}`} className="block hover:bg-muted/50">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <CardTitle className="flex items-center gap-2">
                                {topic.title}
                                {topic.is_pinned && <Badge variant="secondary">Pinned</Badge>}
                                {topic.is_locked && <Badge variant="outline">Locked</Badge>}
                              </CardTitle>
                              <CardDescription>
                                Started by {topic.author_name} •{" "}
                                {formatDistanceToNow(new Date(topic.created_at), { addSuffix: true })}
                              </CardDescription>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MessageSquare className="h-4 w-4" />
                                <span>{topic.reply_count}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{formatDistanceToNow(new Date(topic.updated_at), { addSuffix: true })}</span>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                      </Link>
                    </Card>
                  ))}
                </div>
              )}
            </>
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
