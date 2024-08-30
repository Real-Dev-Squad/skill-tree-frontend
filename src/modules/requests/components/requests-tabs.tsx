import { Tabs, TTab } from "@/components/tabs"

const tabs: TTab[] = [
    { order: 0, label: "All requests", href: "/requests" },
    { order: 1, label: "Pending requests", href: "/requests/pending" },
]

export const RequestsTabs = () => {
    return <Tabs tabs={tabs} />
}
