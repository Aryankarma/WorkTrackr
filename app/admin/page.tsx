import { AdminLogin } from "@/components/admin-login"

export default function AdminPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-slate-950 to-gray-900">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Admin Login</h1>
        <AdminLogin />
      </div>
    </main>
  )
}

