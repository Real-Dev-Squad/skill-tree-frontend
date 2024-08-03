import type { AppProps } from "next/app"
import { Inter } from "next/font/google"

import { validateEnv } from "@/config"
import "@/styles/global.css"
import { Providers } from "@/utils/providers"
import { UserGuard } from "@/components/user-guard"
import { inter } from "@/utils/fonts"

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
                    <Component {...pageProps} />
                </UserGuard>
            </Providers>
        </div>
    )
}
