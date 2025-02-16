import {ClientLogin} from "@/components/client-login"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-slate-950 via-gray-900 to-gray-950">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Welcome to WorkTrackr</h1>
        <ClientLogin />
      </div>
    </main>
  )
}

