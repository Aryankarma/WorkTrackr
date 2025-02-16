"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { signInWithCustomToken } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { toast } from "react-hot-toast"

export function ClientLogin() {
  const [clientId, setClientId] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // In a real-world scenario, you would verify the client ID on your server
      // and generate a custom token. For this example, we'll use the client ID as the token.
      await signInWithCustomToken(auth, clientId)
      router.push("/dashboard")
    } catch (error) {
      console.error("Error logging in:", error)
      toast.error("Invalid client ID. Please try again.")
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Client Login</CardTitle>
        <CardDescription>Enter your unique client ID to access your project status</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <Input
            type="text"
            placeholder="Enter your client ID"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="mb-4"
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">Need help? Contact <a href="http://mailto:aryankarma29@gmail.com" className="hover:underline">WorkTrackr Team</a></p>
      </CardFooter>
    </Card>
  )
}

