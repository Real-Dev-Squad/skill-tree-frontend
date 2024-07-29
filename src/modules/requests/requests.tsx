import { SkillsApi } from "@/api/skills/skills.api"
import { Navbar } from "@/components/navbar"
import { useQuery } from "@tanstack/react-query"

export const Requests = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["SkillsApi.getAllPendingSkillRequests"],
        queryFn: SkillsApi.getAllPendingSkillRequests,
    })

    return (
        <div>
            <Navbar />

            <main className="mx-auto mt-14 max-w-screen-2xl p-6">
                <h1 className="pb-6">Requests</h1>
                {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
            </main>
        </div>
    )
}
