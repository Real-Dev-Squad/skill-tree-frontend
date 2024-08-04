import { Avatar } from "./avatar"

export type TProfile = {
    name: string
    profilePicture: string
}

type AvatarGroupProps = {
    profiles: TProfile[]
}

export const AvatarGroup = ({ profiles }: AvatarGroupProps) => {
    const visibleProfiles = profiles.slice(0, 3)
    const remainingCount = profiles.length > 3 ? profiles.length - 3 : 0

    return (
        <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
                {visibleProfiles.map((profile, index) => (
                    <div className="relative" style={{ zIndex: `${30 - index}` }}>
                        <Avatar
                            size="sm"
                            alt={profile.name}
                            src={profile.profilePicture}
                            className="border-2 border-white"
                            fallback={profile.name.slice(0, 1)}
                        />
                    </div>
                ))}
            </div>

            {remainingCount > 0 && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-sm text-gray-500">
                    +{remainingCount}
                </div>
            )}
        </div>
    )
}
