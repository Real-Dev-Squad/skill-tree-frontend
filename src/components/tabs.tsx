import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/utils/classname"

export type TTab = {
    order: number
    label: string
    href: string
}

type TabsProps = {
    tabs: TTab[]
}

export const Tabs = ({ tabs }: TabsProps) => {
    const pathname = usePathname()
    const sortedTabs = tabs.sort((a, b) => a.order - b.order)

    return (
        <div className="flex w-max items-center rounded-lg bg-gray-100 p-1">
            {sortedTabs.map((tab) => (
                <Link
                    href={tab.href}
                    key={tab.href}
                    className={cn(
                        "flex h-8 items-center justify-center rounded px-4 text-xs font-medium",
                        pathname === tab.href ? "bg-white" : "bg-transparent"
                    )}
                >
                    {tab.label}
                </Link>
            ))}
        </div>
    )
}
