import { useState, useEffect } from 'react'
import canUseDOM from './canUseDOM'

function getWindowDimensions() {
  if (!canUseDOM) {
    return {
      width: 0,
      height: 0,
    }
  }
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}
