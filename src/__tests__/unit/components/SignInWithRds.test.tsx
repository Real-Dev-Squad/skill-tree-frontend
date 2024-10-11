import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { useRouter } from "next/navigation"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { SignInWithRds } from "@/components/signin-with-rds"
import { TGlobalStoreUser, useGlobalStore } from "@/store/global-store"

// Mock the next/navigation module
vi.mock("next/navigation", () => ({
    useRouter: vi.fn(),
}))

// Mock the global store
vi.mock("@/store/global-store", () => ({
    useGlobalStore: vi.fn(),
}))

describe("SignInWithRds", () => {
    const mockPush = vi.fn()

    beforeEach(() => {
        vi.mocked(useRouter).mockReturnValue({
            push: mockPush,
        } as unknown as AppRouterInstance)
    })

    afterEach(() => {
        cleanup()
        vi.clearAllMocks()
    })

    it("renders sign-in button for unauthenticated user", () => {
        vi.mocked(useGlobalStore).mockReturnValue({
            user: null,
        } as unknown as TGlobalStoreUser)

        render(<SignInWithRds />)

        expect(screen.getByText("SignIn within rds")).toBeDefined()
    })

    it("handles sign-in button click", () => {
        vi.mocked(useGlobalStore).mockReturnValue({
            user: null,
        } as unknown as TGlobalStoreUser)

        render(<SignInWithRds />)

        fireEvent.click(screen.getByText("SignIn within rds"))

        expect(mockPush).toHaveBeenCalledWith(expect.stringContaining("/auth/github/login?redirectURL="))
    })

    it("renders user info for authenticated user", () => {
        const mockUser = { name: "John Doe", profilePicture: "/path/to/image.jpg" }
        vi.mocked(useGlobalStore).mockReturnValue({
            user: mockUser,
        } as unknown as TGlobalStoreUser)

        render(<SignInWithRds />)
        expect(screen.getByText("John Doe")).toBeDefined()
        expect(screen.getByRole("img")).toBeDefined()
    })
})
