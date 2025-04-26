"use client"

import { useSelector } from "react-redux"
import { selectAllCryptos } from "@/lib/features/crypto/cryptoSlice"
import CryptoRow from "@/components/crypto-row"
import { motion } from "framer-motion"

export default function CryptoTable() {
  const cryptos = useSelector(selectAllCryptos)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg bg-gray-800 border border-gray-700">
      <motion.table
        className="min-w-full divide-y divide-gray-700"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <thead className="bg-gray-700">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Asset
            </th>
            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
              Price
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider hidden sm:table-cell"
            >
              1h %
            </th>
            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
              24h %
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider hidden md:table-cell"
            >
              7d %
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider hidden lg:table-cell"
            >
              Market Cap
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider hidden lg:table-cell"
            >
              24h Volume
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider hidden xl:table-cell"
            >
              Circulating Supply
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider hidden xl:table-cell"
            >
              Max Supply
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider hidden md:table-cell"
            >
              7D Chart
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700 bg-gray-800">
          {cryptos.map((crypto) => (
            <CryptoRow key={crypto.id} crypto={crypto} />
          ))}
        </tbody>
      </motion.table>
    </div>
  )
}
