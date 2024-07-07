import type { AppProps } from "next/app"

import { validateEnv } from "@/config"
import "@/styles/global.css"
import { Providers } from "@/utils/providers"

/**
 * Validate if all the required environment variables are set
 * this will allow us to fail fast if any of the required environment variables are not set
 * ---
 */
validateEnv()

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Providers>
            <Component {...pageProps} />
        </Providers>
    )
}
