import type { AppProps } from "next/app"
import { Inter } from "next/font/google"

import { validateEnv } from "@/config"
import "@/styles/global.css"
import { Providers } from "@/utils/providers"
import { UserGuard } from "@/components/user-guard"

/**
 * Validate if all the required environment variables are set
 * this will allow us to fail fast if any of the required environment variables are not set
 * ---
 */
validateEnv()

const inter = Inter({
    display: "swap",
    preload: true,
    subsets: ["latin"],
    variable: "--font-inter",
    weight: ["400", "500", "600", "700"],
})

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
