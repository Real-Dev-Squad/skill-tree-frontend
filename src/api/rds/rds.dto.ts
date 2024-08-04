export type RdsUserSelfResDto = {
    id: string
    incompleteUserDetails: boolean
    discordJoinedAt: string
    discordId: string
    roles: {
        archived: boolean
        in_discord: boolean
        member: boolean
    }
    linkedin_id: boolean
    picture?: {
        url: string
        publicId: string
    }
    yoe: number
    github_created_at: number
    github_display_name: string
    github_id: string
    twitter_id: string
    username: string
    github_user_id: string
    first_name: string
    profileURL: string
    website: string
    last_name: string
    company: string
    designation: string
    instagram_id: string
    profileStatus: string // TODO: Make this a enum
    updated_at: number
    created_at: number
}
