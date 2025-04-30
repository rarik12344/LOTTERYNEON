import { useState } from 'react'
import { formatEther } from 'viem'

export default function BuyModal({
  onClose,
  ticketPrice,
  isConnected,
  isCorrectNetwork,
  switchNetwork
}: {
  onClose: () => void
  ticketPrice: number
  isConnected: boolean
  isCorrectNetwork: boolean
  switchNetwork: () => void
}) {
  const [ticketAmount, setTicketAmount] = useState(1)

  if (!isConnected) {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-700">
          <div className="text-center py-8">
            <h3 className="text-xl font-bold mb-4">Wallet Not Connected</h3>
            <p className="text-gray-400 mb-6">Please connect your wallet to buy tickets</p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!isCorrectNetwork) {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-700">
          <div className="text-center py-8">
            <h3 className="text-xl font-bold mb-4">Wrong Network</h3>
            <p className="text-gray-400 mb-6">Please switch to Base Network</p>
            <button
              onClick={switchNetwork}
              className="px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 mr-3"
            >
              Switch Network
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Buy Tickets</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        <div className="flex items-center justify-center gap-4 my-6">
          <button 
            onClick={() => setTicketAmount(Math.max(1, ticketAmount - 1))}
            className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-700 hover:bg-gray-600 text-2xl font-bold"
          >
            -
          </button>
          <input
            type="number"
            min="1"
            max="100"
            value={ticketAmount}
            onChange={(e) => setTicketAmount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1))}
            className="w-20 text-center text-2xl font-bold bg-gray-700 border border-gray-600 rounded-lg py-2"
          />
          <button 
            onClick={() => setTicketAmount(Math.min(100, ticketAmount + 1))}
            className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-700 hover:bg-gray-600 text-2xl font-bold"
          >
            +
          </button>
        </div>

        <div className="flex justify-between items-center bg-gray-700/50 p-3 rounded-lg border border-gray-600 mb-4">
          <span className="text-gray-300">Total Cost:</span>
          <span className="font-medium">
            {(ticketPrice * ticketAmount).toFixed(6)} ETH
          </span>
        </div>

        <div className="text-sm text-gray-400 text-center mb-6">
          Estimated fee: ~$0.10-$0.50
        </div>

        <button
          className="w-full py-3 px-4 rounded-lg font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
        >
          Confirm Purchase
        </button>
      </div>
    </div>
  )
}
