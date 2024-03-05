import { rest } from "msw";
import { RDS_BACKEND_URL } from "@/constants/urls";
import { selfUser } from "../db/users";
import { unauthorizedResponse } from "../db/common";

export const usersHandler = [
    rest.get(`${RDS_BACKEND_URL}/users/self`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(selfUser));
    }),
];

export const selfUserUnauthorizedHandler = rest.get(`${RDS_BACKEND_URL}/users/self`, (req, res, ctx) => {
    return res(ctx.status(401), ctx.json(unauthorizedResponse));
});
