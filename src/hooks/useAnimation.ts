import { useState, useCallback, useRef, useEffect } from 'react'

interface UseAnimationOptions {
  duration?: number
  autoPlay?: boolean
}

function useAnimation<T>(
  steps: T[],
  options: UseAnimationOptions = {}
) {
  const { duration = 500, autoPlay = false } = options
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const intervalRef = useRef<number | null>(null)

  const play = useCallback(() => setIsPlaying(true), [])
  const pause = useCallback(() => setIsPlaying(false), [])
  
  const reset = useCallback(() => {
    setIsPlaying(false)
    setCurrentStep(0)
  }, [])

  const step = useCallback((direction: 'next' | 'prev' = 'next') => {
    setCurrentStep((prev) => {
      if (direction === 'next') {
        return prev < steps.length - 1 ? prev + 1 : prev
      }
      return prev > 0 ? prev - 1 : prev
    })
  }, [steps.length])

  const goToStep = useCallback((stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < steps.length) {
      setCurrentStep(stepIndex)
    }
  }, [steps.length])

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1
          }
          setIsPlaying(false)
          return prev
        })
      }, duration)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, duration, steps.length])

  return {
    currentStep,
    currentData: steps[currentStep],
    isPlaying,
    play,
    pause,
    reset,
    step,
    goToStep,
    totalSteps: steps.length,
  }
}

export default useAnimation
