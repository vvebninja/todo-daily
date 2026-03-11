import { useProgress } from '@bprogress/react'
import { useIsFetching } from '@tanstack/react-query'
import { useEffect } from 'react'

export function ProgressController() {
  const isFetching = useIsFetching()
  const { start, stop } = useProgress()

  useEffect(() => {
    if (isFetching > 0) {
      start()
    }
    else {
      stop()
    }
  }, [isFetching, start, stop])

  return null
}
