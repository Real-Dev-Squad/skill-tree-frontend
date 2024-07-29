import { SkillsApi } from "@/api/skills/skills.api"
import { PageError } from "@/components/page-error"
import { Shimmer } from "@/components/shimmer"
import { RootLayout } from "@/layouts/root-layout"
import { useQuery } from "@tanstack/react-query"
import { RequestsTable } from "./components/requests-table"

export const Requests = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["SkillsApi.getAllPendingSkillRequests"],
        queryFn: SkillsApi.getAllPendingSkillRequests,
    })

    if (isLoading) {
        return (
            <RootLayout>
                <div className="flex-1 space-y-4 p-6">
                    <Shimmer />
                    <Shimmer />
                    <Shimmer />
                    <Shimmer />
                </div>
            </RootLayout>
        )
    }

    if (isError) {
        return (
            <RootLayout>
                <PageError />
            </RootLayout>
        )
    }

    return (
        <RootLayout>
            <div className="w-full p-6">
                <div className="mx-auto max-w-screen-lg rounded-lg border border-gray-100 bg-white p-6">
                    <h1 className="pb-6 text-2xl font-semibold text-gray-800">Requests board</h1>

                    <RequestsTable data={data ?? { requests: [], users: [] }} />
                </div>
            </div>
        </RootLayout>
    )
}
