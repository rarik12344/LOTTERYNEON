'use client'
import { useState, useEffect } from 'react'
import { formatEther, parseEther } from 'viem'
import { 
  useAccount, 
  useContractRead, 
  useContractWrite, 
  useNetwork, 
  usePrepareContractWrite,
  useSwitchNetwork
} from 'wagmi'
import CountdownTimer from '../components/CountdownTimer'
import LotteryInfo from '../components/LotteryInfo'
import BuyModal from '../components/BuyModal'
import WinnersModal from '../components/WinnersModal'

const CONTRACT_ADDRESS = '0x6927648b3114B8B54FA5476Ec3BC3A52f1ab513B'
const CONTRACT_ABI = [ /* Вставьте ваш ABI здесь */ ]

export default function Home() {
  const [isMiniApp, setIsMiniApp] = useState(false)
  const [ethPrice, setEthPrice] = useState(3000)
  const [showModal, setShowModal] = useState<'buy' | 'winners' | null>(null)

  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

  // Contract reads
  const { data: roundInfo } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getCurrentRoundInfo',
    watch: true
  })

  const { data: ticketPrice } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'ticketPriceETH',
    watch: true
  })

  // Check if in Warpcast MiniApp
  useEffect(() => {
    if (typeof window !== 'undefined' && window.farcasterMiniApp) {
      setIsMiniApp(true)
    }
  }, [])

  // Connect wallet handler
  const connectWallet = async () => {
    if (isMiniApp) {
      try {
        await window.farcasterMiniApp.connectWallet({
          chainId: '0x2105',
          rpcUrl: 'https://mainnet.base.org'
        })
      } catch (error) {
        console.error('MiniApp wallet connection error:', error)
      }
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      {isMiniApp && (
        <div className="fixed top-3 right-3 bg-purple-600 text-white px-3 py-1 rounded-full text-sm animate-pulse">
          Warpcast Mode
        </div>
      )}

      <div className="bg-gray-800/90 rounded-xl p-6 w-full max-w-md border border-gray-700 backdrop-blur-sm">
        <h1 className="text-2xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          ✨ NEON LOTTERY ✨
        </h1>

        <CountdownTimer endTime={roundInfo ? Number(roundInfo[1]) : 0} />

        <LotteryInfo 
          ticketPrice={ticketPrice ? formatEther(ticketPrice) : '0'} 
          prizePool={roundInfo ? formatEther(roundInfo[2]) : '0'} 
          isConnected={isConnected}
        />

        <div className="space-y-3 mt-6">
          <button
            onClick={connectWallet}
            className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
              isConnected 
                ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/50 shine-effect'
                : 'bg-gradient-to-r from-cyan-400 to-blue-500 text-gray-900 hover:from-cyan-500 hover:to-blue-600'
            }`}
          >
            {isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : 'Connect Wallet'}
          </button>

          <button
            onClick={() => setShowModal('buy')}
            disabled={!isConnected}
            className="w-full py-3 px-4 rounded-lg font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            Buy Tickets
          </button>

          <button
            onClick={() => setShowModal('winners')}
            className="w-full py-3 px-4 rounded-lg font-medium bg-gradient-to-r from-pink-500 to-red-500 text-white hover:from-pink-600 hover:to-red-600 flex items-center justify-center gap-2"
          >
            View Winners
          </button>
        </div>
      </div>

      {showModal === 'buy' && (
        <BuyModal 
          onClose={() => setShowModal(null)}
          ticketPrice={ticketPrice ? Number(ticketPrice) : 0}
          isConnected={isConnected}
          isCorrectNetwork={chain?.id === 8453}
          switchNetwork={() => switchNetwork?.(8453)}
        />
      )}

      {showModal === 'winners' && (
        <WinnersModal onClose={() => setShowModal(null)} />
      )}
    </main>
  )
}
