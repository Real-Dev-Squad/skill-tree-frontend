type Urls = {
    [key: string]: {
        BACKEND_BASE_URL: string;
        RDS_BACKEND_URL: string;
        SKILL_TREE_SITE: string;
        STATUS_SITE: string;
        MEMBERS_SITE: string;
        WELCOME_SITE: string;
        WWW_SITE: string;
        MY_SITE: string;
    };
};

export const URLS_MAP: Urls = {
    production: {
        BACKEND_BASE_URL: "https://skilltree-api.realdevsquad.com/v1",
        RDS_BACKEND_URL: "https://api.realdevsquad.com",
        SKILL_TREE_SITE: "https:/skilltree.realdevsquad.com",
        STATUS_SITE: "https://status.realdevsquad.com",
        MEMBERS_SITE: "https://members.realdevsquad.com",
        WELCOME_SITE: "https://welcome.realdevsquad.com",
        WWW_SITE: "https://www.realdevsquad.com",
        MY_SITE: "https://my.realdevsquad.com",
    },
    staging: {
        BACKEND_BASE_URL: "https://staging-skilltree-api.realdevsquad.com/v1",
        RDS_BACKEND_URL: "https://staging-api.realdevsquad.com",
        SKILL_TREE_SITE: "https://staging-skilltree.realdevsquad.com",
        STATUS_SITE: "https://staging-status.realdevsquad.com",
        MEMBERS_SITE: "https://staging-members.realdevsquad.com",
        WELCOME_SITE: "https://welcome.realdevsquad.com",
        WWW_SITE: "https://staging-www.realdevsquad.com",
        MY_SITE: "https://staging-my.realdevsquad.com",
    },
    development: {
        BACKEND_BASE_URL: "https://staging-skilltree-api.realdevsquad.com/v1",
        RDS_BACKEND_URL: "https://staging-api.realdevsquad.com",
        SKILL_TREE_SITE: "https://staging-skilltree.realdevsquad.com",
        STATUS_SITE: "https://staging-status.realdevsquad.com",
        MEMBERS_SITE: "https://staging-members.realdevsquad.com",
        WELCOME_SITE: "https://welcome.realdevsquad.com",
        WWW_SITE: "https://staging-www.realdevsquad.com",
        MY_SITE: "https://staging-my.realdevsquad.com",
    },
};

export const URLS = { ...URLS_MAP[process.env.NEXT_PUBLIC_APP_ENV] };

export const BASE_URL: string = URLS.BACKEND_BASE_URL;
export const RDS_BACKEND_URL: string = URLS.RDS_BACKEND_URL;
