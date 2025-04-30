export default function LotteryInfo({
  ticketPrice,
  prizePool,
  isConnected
}: {
  ticketPrice: string
  prizePool: string
  isConnected: boolean
}) {
  return (
    <div className="space-y-3 mb-6">
      <div className="flex justify-between items-center bg-gray-700/50 p-3 rounded-lg border border-gray-600">
        <span className="text-gray-300">Ticket Price:</span>
        <span>{parseFloat(ticketPrice).toFixed(6)} ETH</span>
      </div>

      <div className="flex justify-between items-center bg-gray-700/50 p-3 rounded-lg border border-gray-600">
        <span className="text-gray-300">Current Pool:</span>
        <span>{parseFloat(prizePool).toFixed(4)} ETH</span>
      </div>

      {isConnected && (
        <div className="flex justify-between items-center bg-gray-700/50 p-3 rounded-lg border border-gray-600">
          <span className="text-gray-300">Your Tickets:</span>
          <span>0</span>
        </div>
      )}
    </div>
  )
}
