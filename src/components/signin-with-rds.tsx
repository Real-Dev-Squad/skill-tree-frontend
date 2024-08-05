import Image from "next/image"
import { useRouter } from "next/navigation"

import { config } from "@/config"
import { ROUTES } from "@/routes"
import { useGlobalStore } from "@/store/global-store"

export const SignInWithRds = () => {
    const { push } = useRouter()
    const { user } = useGlobalStore((store) => ({ user: store.user }))

    const handleSignIn = async () => {
        const redirectUrl = `${config.skillTreeUrl}${ROUTES.requests}`
        const url = `${config.rdsBackendBaseUrl}/auth/github/login?redirectURL=${redirectUrl}?v2=true`

        push(url)
    }

    // TODO : make a separate component for this
    if (user) {
        return (
            <div className="flex items-center gap-2">
                <Image
                    src={user.profilePicture}
                    alt={user.name}
                    width={64}
                    height={64}
                    className="h-7 w-7 overflow-hidden rounded-full"
                />

                <span className="inline-block">{user.name}</span>
            </div>
        )
    }

    return (
        <button
            onClick={handleSignIn}
            className="h-9 rounded-lg bg-gray-200 px-4 font-medium text-gray-700 transition hover:bg-gray-300"
        >
            SignIn within rds
        </button>
    )
}
