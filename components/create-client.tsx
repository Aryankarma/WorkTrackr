"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { db } from "@/lib/firebase"
import { collection, addDoc } from "firebase/firestore"
import { toast } from "react-hot-toast"

export function CreateClient() {
  const [clientName, setClientName] = useState("")
  const [clientEmail, setClientEmail] = useState("")

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const docRef = await addDoc(collection(db, "clients"), {
        name: clientName,
        email: clientEmail,
      })
      toast.success(`Client created with ID: ${docRef.id}`)
      setClientName("")
      setClientEmail("")
    } catch (error) {
      console.error("Error creating client:", error)
      toast.error("Failed to create client. Please try again.")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Client</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCreateClient} className="space-y-4">
          <Input placeholder="Client Name" value={clientName} onChange={(e) => setClientName(e.target.value)} />
          <Input
            type="email"
            placeholder="Client Email"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
          />
          <Button type="submit">Create Client</Button>
        </form>
      </CardContent>
    </Card>
  )
}

