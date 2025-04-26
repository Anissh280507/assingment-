"use client"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/lib/store"
import { initialCryptoData } from "@/lib/initial-data"

export interface Crypto {
  id: string
  name: string
  symbol: string
  logo: string
  price: number
  percent_change_1h: number
  percent_change_24h: number
  percent_change_7d: number
  market_cap: number
  volume_24h: number
  circulating_supply: number
  max_supply: number | null
  price_history: number[]
}

interface CryptoState {
  cryptos: Crypto[]
}

const initialState: CryptoState = {
  cryptos: initialCryptoData,
}

export const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    updateCryptoPrice: (state, action: PayloadAction<{ id: string; price: number }>) => {
      const { id, price } = action.payload
      const crypto = state.cryptos.find((c) => c.id === id)
      if (crypto) {
        crypto.price = price
        // Update price history by removing the oldest price and adding the new one
        crypto.price_history = [...crypto.price_history.slice(1), price]
      }
    },
    updateCryptoPercentages: (
      state,
      action: PayloadAction<{
        id: string
        percent_1h?: number
        percent_24h?: number
        percent_7d?: number
      }>,
    ) => {
      const { id, percent_1h, percent_24h, percent_7d } = action.payload
      const crypto = state.cryptos.find((c) => c.id === id)
      if (crypto) {
        if (percent_1h !== undefined) crypto.percent_change_1h = percent_1h
        if (percent_24h !== undefined) crypto.percent_change_24h = percent_24h
        if (percent_7d !== undefined) crypto.percent_change_7d = percent_7d
      }
    },
    updateCryptoVolume: (state, action: PayloadAction<{ id: string; volume: number }>) => {
      const { id, volume } = action.payload
      const crypto = state.cryptos.find((c) => c.id === id)
      if (crypto) {
        crypto.volume_24h = volume
      }
    },
  },
})

// Export actions
export const { updateCryptoPrice, updateCryptoPercentages, updateCryptoVolume } = cryptoSlice.actions

// Export selectors
export const selectAllCryptos = (state: RootState) => state.crypto.cryptos
export const selectCryptoById = (state: RootState, id: string) =>
  state.crypto.cryptos.find((crypto) => crypto.id === id)

export default cryptoSlice.reducer
