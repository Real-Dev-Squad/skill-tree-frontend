import { useQuery } from "@tanstack/react-query"
import Link from "next/link"

import { SkillsApi } from "@/api/skills"
import { UserSkillStatusEnum } from "@/api/skills/skills.enum"
import { Button } from "@/components/button"
import { PageError } from "@/components/page-error"
import { Shimmer } from "@/components/shimmer"
import { RootLayout } from "@/layouts/root-layout"
import { ROUTES } from "@/routes"
import { useGlobalStore } from "@/store/global-store"

import { RequestsTable } from "../requests/components/requests-table"
import { RequestsTabs } from "../requests/components/requests-tabs"

export const PendingRequests = () => {
    const isSuperUser = useGlobalStore((store) => store.user?.roles.super_user)

    const { data, isLoading, isError } = useQuery({
        queryKey: ["SkillsApi.getAllPendingSkillRequests"],
        queryFn: () => SkillsApi.getAllPendingSkillRequests({ status: UserSkillStatusEnum.PENDING }),
    })

    if (isLoading) {
        return (
            <RootLayout>
                <div className="mx-auto w-full max-w-screen-xl flex-1 space-y-4 p-6 xl:py-10">
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
                    <div className="pb-6">
                        <RequestsTabs />
                    </div>

                    <div className="flex items-center gap-4 pb-6">
                        <h1 className="flex-1 text-2xl font-semibold text-gray-800">Pending requests</h1>

                        {isSuperUser && (
                            <Button asChild size="xs" variant="ghost" className="text-gray-500">
                                <Link href={ROUTES.skills.create}>Create Skill</Link>
                            </Button>
                        )}

                        <Button asChild size="xs" variant="secondary">
                            <Link href={ROUTES.endorsements.create}>Create Endorsement</Link>
                        </Button>
                    </div>

                    <RequestsTable data={data ?? { requests: [], users: [] }} />
                </div>
            </div>
        </RootLayout>
    )
}
