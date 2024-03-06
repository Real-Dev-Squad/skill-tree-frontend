import { renderHook, waitFor } from "@testing-library/react";

import { selfUserServerErrorHandler, selfUserUnauthorizedHandler } from "../../__mocks__/handlers/users";
import { server } from "../../__mocks__/server";
import { useGetSelfUser } from "@/services/users";
import { createWrapper, testQueryClient } from "../utils";

import { serverErrorResponse, unauthorizedResponse } from "../../__mocks__/db/common";
import { selfUser } from "../../__mocks__/db/users";
import { AxiosError } from "axios";

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
        server.use(selfUserUnauthorizedHandler);
        const { result } = renderHook(() => useGetSelfUser(), { wrapper: createWrapper() });

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result?.current.isError).toStrictEqual(true);

        if (result?.current?.error instanceof AxiosError) {
            expect(result?.current?.error?.response?.data).toStrictEqual(unauthorizedResponse);
        }
    });

    it("should return server error with server error response message", async () => {
        server.use(selfUserServerErrorHandler);

        const { result } = renderHook(() => useGetSelfUser(), { wrapper: createWrapper() });

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result?.current.isError).toStrictEqual(true);

        if (result?.current?.error instanceof AxiosError) {
            expect(result?.current?.error?.response?.data).toStrictEqual(serverErrorResponse);
        }
    });
});
