import { ReactNode } from "react";
import Head from "next/head";
import Navbar from "./common/Navbar/Navbar";

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
            <Navbar />
            {children}
        </div>
    );
}
