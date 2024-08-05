import { useEffect } from "react"

import { useQuery } from "@tanstack/react-query"
import { usePathname } from "next/navigation"

import { RdsApi } from "@/api/rds"
import { ROUTES } from "@/routes"
import { TGlobalStoreUser, useGlobalStore } from "@/store/global-store"

import { Loader } from "./loader"
import { PageError } from "./page-error"

type Props = {
    children: React.ReactNode
}

const UNPROTECTED_PATHS: string[] = [ROUTES.root, ROUTES.signIn]

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
            roles: data.roles,
        }

        setGlobalStore({ user })
    }, [data, setGlobalStore])

    if (isLoading) {
        return (
            <div className="grid h-screen w-full place-items-center">
                <Loader className="h-7 w-7" />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="grid h-screen w-full place-items-center">
                <PageError />
            </div>
        )
    }

    return <>{children}</>
}
