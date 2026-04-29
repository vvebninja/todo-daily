import { useEffect, useRef, useState } from 'react'

export function useIsIntersecting<T extends HTMLElement = HTMLDivElement>() {
  const [isIntersecting, setIsIntersecting] = useState(true)
  const ref = useRef<T>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return { ref, isIntersecting }
}
