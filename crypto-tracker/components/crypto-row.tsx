"use client"

import { formatNumber, formatCurrency, formatPercentage } from "@/lib/utils"
import PriceChart from "@/components/price-chart"
import { motion } from "framer-motion"
import type { Crypto } from "@/lib/features/crypto/cryptoSlice"

interface CryptoRowProps {
  crypto: Crypto
}

export default function CryptoRow({ crypto }: CryptoRowProps) {
  const getPercentageClass = (value: number) => {
    return value >= 0 ? "text-green-500 transition-colors duration-300" : "text-red-500 transition-colors duration-300"
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.tr className="hover:bg-gray-700 transition-colors duration-200" variants={item} layout>
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img className="h-10 w-10 rounded-full" src={crypto.logo || "/placeholder.svg"} alt={crypto.name} />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-white">{crypto.name}</div>
            <div className="text-sm text-gray-400">{crypto.symbol}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-right">
        <motion.div
          className="text-sm font-medium text-white"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 0.3 }}
          key={crypto.price}
        >
          {formatCurrency(crypto.price)}
        </motion.div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-right hidden sm:table-cell">
        <div className={`text-sm ${getPercentageClass(crypto.percent_change_1h)}`}>
          {formatPercentage(crypto.percent_change_1h)}
        </div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-right">
        <div className={`text-sm ${getPercentageClass(crypto.percent_change_24h)}`}>
          {formatPercentage(crypto.percent_change_24h)}
        </div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-right hidden md:table-cell">
        <div className={`text-sm ${getPercentageClass(crypto.percent_change_7d)}`}>
          {formatPercentage(crypto.percent_change_7d)}
        </div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-right hidden lg:table-cell">
        <div className="text-sm text-gray-300">{formatCurrency(crypto.market_cap)}</div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-right hidden lg:table-cell">
        <div className="text-sm text-gray-300">{formatCurrency(crypto.volume_24h)}</div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-right hidden xl:table-cell">
        <div className="text-sm text-gray-300">
          {formatNumber(crypto.circulating_supply)} {crypto.symbol}
        </div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-right hidden xl:table-cell">
        <div className="text-sm text-gray-300">
          {crypto.max_supply ? `${formatNumber(crypto.max_supply)} ${crypto.symbol}` : "N/A"}
        </div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap hidden md:table-cell">
        <div className="h-12 w-32 mx-auto">
          <PriceChart data={crypto.price_history} color={crypto.percent_change_7d >= 0 ? "#10B981" : "#EF4444"} />
        </div>
      </td>
    </motion.tr>
  )
}
