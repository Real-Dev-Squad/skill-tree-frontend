import { RdsApi } from "@/api/rds"
import { ROUTES } from "@/routes"
import { TGlobalStoreUser, useGlobalStore } from "@/store/global-store"
import { useQuery } from "@tanstack/react-query"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

type Props = {
    children: React.ReactNode
}

const UNPROTECTED_PATHS = [ROUTES.root, ROUTES.signIn]

export const UserGuard = ({ children }: Props) => {
    const pathname = usePathname()
    const isUnprotectedPath = UNPROTECTED_PATHS.includes(pathname)
    const { setGlobalStore } = useGlobalStore((store) => ({ setGlobalStore: store.setGlobalStore }))

    const { data, isLoading, isError } = useQuery({
        enabled: !isUnprotectedPath,
        queryKey: ["RdsApi.getCurrentUserData"],
        queryFn: RdsApi.getCurrentUserData,
    })

    useEffect(() => {
        if (!data) {
            return
        }

        const firstName = data?.first_name ?? ""
        const lastName = data?.last_name ?? ""

        const user: TGlobalStoreUser = {
            id: data.id,
            name: firstName + " " + lastName,
            profilePicture: data?.picture?.url ?? "",
        }

        setGlobalStore({ user })
    }, [data])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error...</div>
    }

    return <>{children}</>
}
