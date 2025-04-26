"use client"

import type { Store } from "@reduxjs/toolkit"
import { updateCryptoPrice, updateCryptoPercentages, updateCryptoVolume } from "@/lib/features/crypto/cryptoSlice"
import { initialCryptoData } from "@/lib/initial-data"

export class MockWebSocket {
  private store: Store
  private interval: NodeJS.Timeout | null = null
  private updateFrequency = 1500 // ms

  constructor(store: Store) {
    this.store = store
  }

  connect() {
    // Simulate WebSocket connection by setting up an interval
    this.interval = setInterval(() => {
      this.emitPriceUpdates()
    }, this.updateFrequency)
  }

  disconnect() {
    // Clear the interval when disconnecting
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }

  private emitPriceUpdates() {
    // For each crypto, randomly update some values
    initialCryptoData.forEach((crypto) => {
      // Randomly decide which values to update
      const shouldUpdatePrice = Math.random() > 0.3
      const shouldUpdatePercentages = Math.random() > 0.5
      const shouldUpdateVolume = Math.random() > 0.7

      if (shouldUpdatePrice) {
        // Update price with a small random change (±2%)
        const priceChange = crypto.price * (Math.random() * 0.04 - 0.02)
        const newPrice = Math.max(0, crypto.price + priceChange)
        this.store.dispatch(updateCryptoPrice({ id: crypto.id, price: newPrice }))
      }

      if (shouldUpdatePercentages) {
        // Update percentages with small random changes
        const percent1hChange = Math.random() * 0.4 - 0.2 // ±0.2%
        const percent24hChange = Math.random() * 0.6 - 0.3 // ±0.3%
        const percent7dChange = Math.random() * 0.8 - 0.4 // ±0.4%

        const currentState = this.store.getState() as any
        const currentCrypto = currentState.crypto.cryptos.find((c: any) => c.id === crypto.id)

        if (currentCrypto) {
          this.store.dispatch(
            updateCryptoPercentages({
              id: crypto.id,
              percent_1h: currentCrypto.percent_change_1h + percent1hChange,
              percent_24h: currentCrypto.percent_change_24h + percent24hChange,
              percent_7d: currentCrypto.percent_change_7d + percent7dChange,
            }),
          )
        }
      }

      if (shouldUpdateVolume) {
        // Update volume with a small random change (±1%)
        const volumeChange = crypto.volume_24h * (Math.random() * 0.02 - 0.01)
        const newVolume = Math.max(0, crypto.volume_24h + volumeChange)
        this.store.dispatch(updateCryptoVolume({ id: crypto.id, volume: newVolume }))
      }
    })
  }
}
