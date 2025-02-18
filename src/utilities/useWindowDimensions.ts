import { useState, useEffect } from 'react'

function getWindowDimensions() {
  if (typeof window === 'undefined') {
    return {
      width: undefined,
      height: undefined,
    }
  }
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState<{
    width: number | undefined
    height: number | undefined
  }>({ width: undefined, height: undefined })
  function handleResize() {
    setWindowDimensions(getWindowDimensions())
  }
  useEffect(() => {
    if (typeof window !== 'undefined') {
      handleResize()
      window.addEventListener('resize', handleResize)
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  return windowDimensions
}
