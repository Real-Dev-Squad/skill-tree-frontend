export type UserData = {
    id: string;
    profileURL?: string;
    discordJoinedAt?: string;
    roles: {
        archived: boolean;
        in_discord: boolean;
        member?: boolean;
        maven?: boolean;
        designer?: boolean;
        product_manager?: boolean;
    };
    profileStatus?: UserProfileStatus;
    status?: UserStatus;
    yoe?: number;
    github_created_at: number;
    company?: string;
    twitter_id?: string;
    first_name?: string;
    incompleteUserDetails: boolean;
    discordId?: string;
    last_name?: string;
    linkedin_id?: string;
    picture?: {
        url?: string;
        publicId?: string;
    };
    instagram_id?: string;
    github_display_name: string;
    github_id: string;
    designation?: string;
    username?: string;
    created_at: number;
    updated_at: number;
    github_user_id: string;
    website?: string;
};

export type UserProfileStatus = "PENDING" | "APPROVED" | "NOT APPROVED" | "BLOCKED";

export type UserStatus = "ooo" | "idle" | "active" | "onboarding";
