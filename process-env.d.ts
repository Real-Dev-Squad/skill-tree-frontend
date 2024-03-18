declare namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_BACKEND_BASE_URL: string;
        NEXT_PUBLIC_STATUS_SITE: string;
        NEXT_PUBLIC_MEMBERS_SITE: string;
        NEXT_PUBLIC_WELCOME_SITE: string;
        NEXT_PUBLIC_WWW_SITE: string;
        NEXT_PUBLIC_MY_SITE: string;
        NEXT_PUBLIC_APP_ENV: "staging" | "production" | "test" | "development";
    }
}
