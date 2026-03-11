import type { ReactNode } from 'react'
import { ProgressProvider } from '@bprogress/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from '@/shared/api/query-client'

type ProvidersProps = Readonly<{ children: ReactNode }>

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ProgressProvider>
        {children}
        <ReactQueryDevtools />
      </ProgressProvider>
    </QueryClientProvider>
  )
}
