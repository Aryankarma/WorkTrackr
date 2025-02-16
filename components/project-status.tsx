"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { db, auth } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"

interface Task {
  title: string
  date: string
}

interface Project {
  title: string
  completed: Task[]
  current: {
    title: string
    estimatedCompletion: string
  }
}

export function ProjectStatus() {
  const [user] = useAuthState(auth)
  const [project, setProject] = useState<Project | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const fetchProjectData = async () => {
      if (user) {
        const projectRef = doc(db, "projects", user.uid)
        const projectSnap = await getDoc(projectRef)

        if (projectSnap.exists()) {
          setProject(projectSnap.data() as Project)
        }
      }
    }

    fetchProjectData()
  }, [user])

  useEffect(() => {
    if (project) {
      const totalTasks = project.completed.length + 1 // +1 for current task
      const completedTasks = project.completed.length
      setProgress((completedTasks / totalTasks) * 100)
    }
  }, [project])

  if (!project) {
    return <div>Loading...</div>
  }

  return (
    <Card className="w-full bg-white/90 backdrop-blur-lg shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">{project.title}</CardTitle>
        <CardDescription>Project Progress</CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="mb-4" />
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Completed Tasks</h3>
            {project.completed.map((task, index) => (
              <div key={index} className="flex justify-between items-center mb-2">
                <span>{task.title}</span>
                <span className="text-sm text-muted-foreground">{task.date}</span>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Current Task</h3>
            <div className="flex justify-between items-center">
              <span>{project.current.title}</span>
              <span className="text-sm text-muted-foreground">
                Est. Completion: {project.current.estimatedCompletion}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

