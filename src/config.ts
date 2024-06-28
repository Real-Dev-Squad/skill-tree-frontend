import { z } from "zod";

const configSchema = z.object({
    appEnv: z.enum(["dev", "staging", "prod"]),
    skillTreeBackendBaseUrl: z.string(),
    rdsBackendBaseUrl: z.string(),
    skillTreeUrl: z.string(),
    statusSiteUrl: z.string(),
    membersSiteUrl: z.string(),
    welcomeSiteUrl: z.string(),
    wwwSiteUrl: z.string(),
    mySiteUrl: z.string(),
});

type TConfig = z.infer<typeof configSchema>;

export const config = {
    appEnv: process.env.NEXT_PUBLIC_APP_ENV,
    skillTreeBackendBaseUrl: process.env.NEXT_PUBLIC_SKILL_TREE_BACKEND_BASE_URL,
    rdsBackendBaseUrl: process.env.NEXT_PUBLIC_RDS_BACKEND_BASE_URL,
    skillTreeUrl: process.env.NEXT_PUBLIC_SKILL_TREE_URL,
    statusSiteUrl: process.env.NEXT_PUBLIC_STATUS_SITE_URL,
    membersSiteUrl: process.env.NEXT_PUBLIC_MEMBERS_SITE_URL,
    welcomeSiteUrl: process.env.NEXT_PUBLIC_WELCOME_SITE_URL,
    wwwSiteUrl: process.env.NEXT_PUBLIC_WWW_SITE_URL,
    mySiteUrl: process.env.NEXT_PUBLIC_MY_SITE_URL,
} as TConfig;

/**
 * Validate if all the required environment variables defined in the schema above are set
 * and are in the correct format else throw an error
 * ---
 */
export const validateEnv = () => {
    const result = configSchema.safeParse(config);
    const errors = result.error?.flatten().fieldErrors;

    if (!result.success) {
        throw new Error(
            JSON.stringify(
                {
                    message: "Error loading config",
                    errors,
                },
                null,
                2
            )
        );
    }
};
