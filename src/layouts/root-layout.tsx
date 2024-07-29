import { Navbar } from "@/components/navbar"

type Props = {
    children: React.ReactNode
}

export const RootLayout = ({ children }: Props) => {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="mt-14 flex flex-1 flex-col">{children}</main>
        </div>
    )
}
