"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { db } from "@/lib/firebase"
import { collection, addDoc } from "firebase/firestore"
import { toast } from "react-hot-toast"

export function CreateProject() {
  const [projectName, setProjectName] = useState("")
  const [clientId, setClientId] = useState("")
  const [clients, setClients] = useState([]) // You need to fetch clients from Firestore

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, "projects"), {
        name: projectName,
        clientId: clientId,
        completed: [],
        current: {
          title: "Project Initialization",
          estimatedCompletion: new Date().toISOString().split("T")[0],
        },
      })
      toast.success("Project created successfully")
      setProjectName("")
      setClientId("")
    } catch (error) {
      console.error("Error creating project:", error)
      toast.error("Failed to create project. Please try again.")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Project</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCreateProject} className="space-y-4">
          <Input placeholder="Project Name" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
          <Select onValueChange={setClientId} value={clientId}>
            <SelectTrigger>
              <SelectValue placeholder="Select Client" />
            </SelectTrigger>
            <SelectContent>
              {clients.map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="submit">Create Project</Button>
        </form>
      </CardContent>
    </Card>
  )
}

