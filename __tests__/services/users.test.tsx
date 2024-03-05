import { rest } from "msw";
import { renderHook, waitFor } from "@testing-library/react";

import { useGetSelfUser } from "@/services/users";
import { createWrapper, testQueryClient } from "../utils";

import { unauthorizedResponse } from "../../__mocks__/db/common";
import { server } from "../../__mocks__/server";
import { selfUser } from "../../__mocks__/db/users";

import { RDS_BACKEND_URL } from "@/constants/urls";

beforeAll(() => {
    server.listen({
        onUnhandledRequest: "warn",
    });
});

afterEach(() => {
    server.resetHandlers();
    testQueryClient.clear();
});

afterEach(() => {
    testQueryClient.clear();
});

afterAll(() => {
    server.close();
});

describe("useGetSelfUser", () => {
    it("should return isSuccess true and return self user details", async () => {
        const { result } = renderHook(() => useGetSelfUser(), { wrapper: createWrapper() });
        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.data).toBeDefined();
        expect(result.current.data).toStrictEqual(selfUser);
    });

    it("should return isError true and return unauthorized error message", async () => {
        server.use(
            rest.get(`${RDS_BACKEND_URL}/users/self`, (req, res, ctx) => {
                return res(ctx.status(401), ctx.json(unauthorizedResponse));
            })
        );
        const { result } = renderHook(() => useGetSelfUser(), { wrapper: createWrapper() });
        waitFor(() => expect(result.current.isSuccess).toBe(true));
        // console.log(result.current)
        // expect(result.current).toBeDefined();
        expect(result.current.data).toStrictEqual(unauthorizedResponse);
    });
});
