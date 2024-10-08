import React from "react"

import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

type Props = {
    children: React.ReactNode
}

export const Providers = ({ children }: Props) => {
    const [client] = React.useState(
        new QueryClient({
            defaultOptions: {
                queries: {
                    retry: 3,

                    refetchOnWindowFocus: false,
                },
            },
        })
    )

    return (
        <QueryClientProvider client={client}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
