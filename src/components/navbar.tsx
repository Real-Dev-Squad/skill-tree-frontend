import { config } from "@/config"
import Link from "next/link"
import { SignInWithRds } from "./signin-with-rds"

type NavLinksList = {
    className?: string
    children: React.ReactNode
}

const NavLinksList = ({ className, children }: NavLinksList) => {
    return <ul className={className}>{children}</ul>
}

type NavLinkProps = {
    href: string
    children: React.ReactNode
}

const NavLink = ({ href, children }: NavLinkProps) => {
    return (
        <li className="rounded-full px-4 py-1 transition-all ease-in-out hover:bg-gray-100">
            <Link href={href}>{children}</Link>
        </li>
    )
}

export const Navbar = () => {
    return (
        <nav className="fixed left-0 top-0 w-full border-b border-gray-100 bg-white">
            <div className="mx-auto flex h-14 w-full max-w-screen-2xl items-center gap-6 px-6">
                <h1 className="text-xl font-bold">Rds</h1>

                <NavLinksList className="flex items-center">
                    <NavLink href={config.welcomeSiteUrl}>Welcome</NavLink>
                    <NavLink href={config.membersSiteUrl}>Members</NavLink>
                    <NavLink href={config.membersSiteUrl}>Status</NavLink>
                </NavLinksList>

                <div className="ml-auto">
                    <SignInWithRds />
                </div>
            </div>
        </nav>
    )
}
