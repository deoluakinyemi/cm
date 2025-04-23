import Link from "next/link"
import { ArrowLeft, PiggyBank, Plus, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getForumCategories } from "@/app/actions/forum-actions"

export default async function ForumPage() {
  const { success, categories, message } = await getForumCategories()

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
                <Link href="/community">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Back to community</span>
                </Link>
              </Button>
              <h1 className="ml-4 text-3xl font-bold">Discussion Forums</h1>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
              <Link href="/community/forum/new-topic">
                <Plus className="mr-2 h-4 w-4" />
                New Topic
              </Link>
            </Button>
          </div>

          {!success ? (
            <div className="rounded-lg border p-8 text-center">
              <p className="text-muted-foreground">{message || "Failed to load forum categories"}</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {categories.map((category) => (
                <Card key={category.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{category.name}</CardTitle>
                        <CardDescription>{category.description}</CardDescription>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {category.topic_count} {Number.parseInt(category.topic_count) === 1 ? "topic" : "topics"}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-emerald-600" />
                        <span className="text-sm text-muted-foreground">Join the conversation</span>
                      </div>
                      <Button asChild>
                        <Link href={`/community/forum/category/${category.slug}`}>Browse Topics</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
