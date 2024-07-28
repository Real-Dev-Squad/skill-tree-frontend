import { useGetEndorsements, usePostEndorsement } from "@/services/endorsements";
import { renderHook, waitFor } from "@testing-library/react";
import { createWrapper } from "../utils";
const { server } = require("../../__mocks__/server");

beforeAll(() => {
    server.listen({
        onUnhandledRequest: "warn",
    });
});

afterEach(() => {
    server.resetHandlers();
});

afterAll(() => {
    server.close();
});

test("test useGetEndorsements hook", async () => {
    const { result } = renderHook(() => useGetEndorsements(), { wrapper: createWrapper });
    await waitFor(() => result.current.isSuccess);
});

test("test usePostEndorsement hook", async () => {
    const { result } = renderHook(() => usePostEndorsement({ endorsementData: {} }), { wrapper: createWrapper });
    await waitFor(() => result.current.isSuccess);
});
