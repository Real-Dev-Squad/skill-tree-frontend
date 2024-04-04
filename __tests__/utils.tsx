import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

export const testQueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

type TestWrapperProps = {
    children: ReactNode;
};

export function createWrapper({ children }: TestWrapperProps) {
    return <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>;
}
