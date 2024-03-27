import { rest } from "msw";
import { RDS_BACKEND_URL } from "@/constants/urls";
import { selfUser } from "../db/users";
import { notFoundResponse, serverErrorResponse, unauthorizedResponse } from "../db/common";

export const usersHandler = [
    rest.get(`${RDS_BACKEND_URL}/users/self`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(selfUser));
    }),
    rest.get(`${RDS_BACKEND_URL}/auth/signout`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ message: "Signout successful" }));
    }),
];

export const selfUserUnauthorizedHandler = rest.get(`${RDS_BACKEND_URL}/users/self`, (req, res, ctx) => {
    return res(ctx.status(401), ctx.json(unauthorizedResponse));
});

export const selfUserServerErrorHandler = rest.get(`${RDS_BACKEND_URL}/users/self`, (req, res, ctx) => {
    return res(ctx.status(401), ctx.json(serverErrorResponse));
});

export const logoutUserNotFoundHandler = rest.get(`${RDS_BACKEND_URL}/auth/signout`, (req, res, ctx) => {
    return res(ctx.status(404), ctx.json(notFoundResponse));
});
