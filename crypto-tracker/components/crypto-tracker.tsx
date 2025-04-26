"use client"

import { useEffect } from "react"
import { Provider } from "react-redux"
import { store } from "@/lib/store"
import CryptoTable from "@/components/crypto-table"
import { MockWebSocket } from "@/lib/mock-websocket"

// Initialize the mock WebSocket connection
let websocket: MockWebSocket | null = null

export default function CryptoTracker() {
  useEffect(() => {
    // Create the mock WebSocket if it doesn't exist
    if (!websocket) {
      websocket = new MockWebSocket(store)
      websocket.connect()
    }

    // Cleanup on unmount
    return () => {
      if (websocket) {
        websocket.disconnect()
        websocket = null
      }
    }
  }, [])

  return (
    <Provider store={store}>
      <div className="w-full animate-fade-in">
        <CryptoTable />
      </div>
    </Provider>
  )
}
