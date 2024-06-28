import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

import { validateEnv } from "@/config";
import "@/styles/global.css";
import { Providers } from "@/utils/providers";


/**
 * Validate if all the required environment variables are set
 * this will allow us to fail fast if any of the required environment variables are not set
 * --- 
*/
validateEnv();


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    // For more info on this pattern visit: https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#with-typescript
    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <Providers>
            {/* @ts-ignore */}
            {getLayout(<Component {...pageProps} />)}
        </Providers>
    );
}
