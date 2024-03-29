import { rest } from "msw";
import { BASE_URL } from "@/constants/urls";
import endorsementDetails from "../db/endorsementDetails.json";

export const endorsementsHandler = [
    rest.get(`${BASE_URL}/endorsements`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(endorsementDetails));
    }),
];
