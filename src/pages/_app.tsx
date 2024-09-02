import type { AppProps } from "next/app"
import { Toaster } from "react-hot-toast"

import { UserGuard } from "@/components/user-guard"
import { validateEnv } from "@/config"
import "@/styles/global.css"
import { inter } from "@/utils/fonts"
import { Providers } from "@/utils/providers"

/**
 * Validate if all the required environment variables are set
 * this will allow us to fail fast if any of the required environment variables are not set
 * ---
 */
validateEnv()

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className={`${inter.variable} font-sans`}>
            <Providers>
                <UserGuard>
                    <Toaster position="top-right" />
                    <Component {...pageProps} />
                </UserGuard>
            </Providers>
        </div>
    )
}
