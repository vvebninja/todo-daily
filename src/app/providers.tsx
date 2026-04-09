import { ProgressProvider } from '@bprogress/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from '@/shared/api/query-client'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ProgressProvider>
        {children}
        <ReactQueryDevtools />
      </ProgressProvider>
    </QueryClientProvider>
  )
}
