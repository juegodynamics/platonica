import React, { useState, useEffect } from 'react'

interface FuncAnimatorProps {
  timeRange: [number, number]
  timeRate?: number
  loop: boolean
  children: (props: { time: number }) => React.ReactNode
}

export const FuncAnimator: React.FC<FuncAnimatorProps> = ({
  timeRange,
  loop,
  children,
  timeRate = 1
}) => {
  const [time, setTime] = useState(timeRange[0])

  useEffect(() => {
    let animationFrame: number
    let startTime: number | null = null

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = (timestamp - startTime) / 1000

      const newTime = timeRange[0] + elapsed * timeRate
      if (newTime <= timeRange[1]) {
        setTime(newTime)
      } else if (loop) {
        startTime = timestamp
        setTime(timeRange[0])
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [timeRange, timeRate, loop])

  return <>{children({ time })}</>
}
