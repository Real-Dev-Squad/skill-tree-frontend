import { ReactNode } from "react";
import Head from "next/head";
import "@/styles/global.css";

type LayoutProps = {
    title: string;
    children: ReactNode;
};
export default function Layout({ title, children }: LayoutProps) {
    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>
            {children}
        </div>
    );
}
