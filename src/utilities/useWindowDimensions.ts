import { useState, useEffect } from 'react'
import canUseDOM from './canUseDOM'

function getWindowDimensions() {
  if (!canUseDOM) {
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

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}
