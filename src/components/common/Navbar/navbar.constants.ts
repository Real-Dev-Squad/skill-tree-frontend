import { RDS_BACKEND_URL, URLS } from "@/constants/urls";
import { NavbarLink } from "./navbar.types";

// ?v2=true so that we get rds-session-v2 cookie from RDS backend
export const SIGNIN_URL = `${RDS_BACKEND_URL}/auth/github/login?redirectURL=${URLS.SKILL_TREE_SITE}?v2=true`;

export const NAVBAR_LINKS: NavbarLink[] = [
    {
        id: "welcome-site",
        name: "Welcome",
        link: URLS.WELCOME_SITE,
    },
    {
        id: "events-site",
        name: "Events",
        link: `${URLS.WWW_SITE}/events`,
    },
    {
        id: "members-site",
        name: "Members",
        link: URLS.MEMBERS_SITE,
    },
    {
        id: "status-site",
        name: "Status",
        link: URLS.STATUS_SITE,
    },
];

export const DROPDOWN_LINKS = [
    {
        id: "home-dropdown",
        link: "/",
        name: "Home",
    },
    {
        id: "status-dropdown",
        link: process.env.NEXT_PUBLIC_MY_SITE,
        name: "Status",
    },
    {
        id: "profile-dropdown",
        link: `${process.env.NEXT_PUBLIC_MY_SITE}/profile`,
        name: "Profile",
    },
    {
        id: "tasks-dropdown",
        link: `${process.env.NEXT_PUBLIC_MY_SITE}/tasks`,
        name: "Tasks",
    },
    {
        id: "indentity-dropdown",
        link: `${process.env.NEXT_PUBLIC_MY_SITE}/tasks`,
        name: "Identity",
    },
];
