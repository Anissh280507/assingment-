import CryptoTracker from "@/components/crypto-tracker"

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Crypto Tracker</h1>
        <p className="text-gray-300 mb-8">Real-time cryptocurrency price tracker</p>
        <CryptoTracker />
      </div>
    </main>
  )
}
