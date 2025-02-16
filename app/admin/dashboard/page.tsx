import { ClientSelector } from "@/components/client-selector"
import { ProjectUpdate } from "@/components/project-update"
import { CreateClient } from "@/components/create-client"
import { CreateProject } from "@/components/create-project"
import { ProtectedRoute } from "@/components/protected-route"
import { LogoutButton } from "@/components/logout-button"

export default function AdminDashboard() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gradient-to-r from-slate-950 to-gray-900 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
            <LogoutButton />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CreateClient />
            <CreateProject />
            <ClientSelector />
            <ProjectUpdate />
          </div>
        </div>
      </main>
    </ProtectedRoute>
  )
}