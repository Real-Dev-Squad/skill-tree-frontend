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

export function createWrapper() {
    // eslint-disable-next-line react/display-name
    return ({ children }: TestWrapperProps) => (
        <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
    );
}
