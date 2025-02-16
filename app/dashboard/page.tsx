import { ProjectStatus } from "@/components/project-status"

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Project Dashboard</h1>
        <ProjectStatus />
      </div>
    </main>
  )
}

