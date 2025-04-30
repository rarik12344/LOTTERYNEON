import { useEffect, useState } from 'react'

export default function CountdownTimer({ endTime }: { endTime: number }) {
  const [timeLeft, setTimeLeft] = useState('00:00:00')

  useEffect(() => {
    if (!endTime) return
    
    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000)
      const distance = endTime - now
      
      if (distance < 0) {
        setTimeLeft('00:00:00')
        return
      }
      
      const hours = Math.floor(distance / 3600)
      const minutes = Math.floor((distance % 3600) / 60)
      const seconds = Math.floor(distance % 60)
      
      setTimeLeft(
        `${hours.toString().padStart(2, '0')}:` +
        `${minutes.toString().padStart(2, '0')}:` +
        `${seconds.toString().padStart(2, '0')}`
      )
    }, 1000)
    
    return () => clearInterval(interval)
  }, [endTime])

  return (
    <div className="text-center my-6">
      <div className="text-4xl font-mono font-bold text-purple-400 mb-2">
        {timeLeft}
      </div>
      <div className="text-sm text-gray-400">
        {endTime * 1000 > Date.now() ? 'Round Active' : 'Round Ended'}
      </div>
    </div>
  )
}
