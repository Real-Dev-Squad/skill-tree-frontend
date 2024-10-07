import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { useRouter } from "next/navigation"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { Navbar } from "@/components/navbar"
import { SignInWithRds } from "@/components/signin-with-rds"
import { config } from "@/config"
import { TGlobalStoreUser, useGlobalStore } from "@/store/global-store"
// Mock the next/navigation module
vi.mock("next/navigation", () => ({
    useRouter: vi.fn(),
}))

// Mock the global store
vi.mock("@/store/global-store", () => ({
    useGlobalStore: vi.fn(),
}))

// Mock the config
vi.mock("@/config", () => ({
    config: {
        welcomeSiteUrl: "https://welcome.realdevsquad.com",
        membersSiteUrl: "https://members.realdevsquad.com",
        statusSiteUrl: "https://status.realdevsquad.com",
    },
}))

describe("SignInWithRds", () => {
    const mockPush = vi.fn()

    beforeEach(() => {
        vi.mocked(useRouter).mockReturnValue({ push: mockPush } as unknown as AppRouterInstance)
    })

    afterEach(() => {
        cleanup()
        vi.clearAllMocks()
    })

    it("renders sign-in button for unauthenticated user", () => {
        vi.mocked(useGlobalStore).mockReturnValue({ user: null } as unknown as TGlobalStoreUser)

        render(<SignInWithRds />)

        expect(screen.getByText("SignIn within rds")).toBeDefined()
    })

    it("handles sign-in button click", () => {
        vi.mocked(useGlobalStore).mockReturnValue({ user: null } as unknown as TGlobalStoreUser)

        render(<SignInWithRds />)

        fireEvent.click(screen.getByText("SignIn within rds"))

        expect(mockPush).toHaveBeenCalledWith(expect.stringContaining("/auth/github/login?redirectURL="))
    })

    it("renders user info for authenticated user", () => {
        const mockUser = { name: "John Doe", profilePicture: "/path/to/image.jpg" }
        vi.mocked(useGlobalStore).mockReturnValue({ user: mockUser } as unknown as TGlobalStoreUser)

        render(<SignInWithRds />)
		screen.debug()
        expect(screen.getByText("John Doe")).toBeDefined()
        expect(screen.getByRole("img")).toBeDefined()
    })
})

describe("Navbar", () => {
    beforeEach(() => {
        vi.mocked(useRouter).mockReturnValue({ push: vi.fn() } as unknown as AppRouterInstance)
    })

    afterEach(() => {
        cleanup()
        vi.clearAllMocks()
    })

    it("renders the logo and navigation links", () => {
        vi.mocked(useGlobalStore).mockReturnValue({ user: null } as unknown as TGlobalStoreUser)

        render(<Navbar />)

        expect(screen.getByText("Rds")).toBeDefined()
        expect(screen.getByText("Welcome")).toBeDefined()
        expect(screen.getByText("Members")).toBeDefined()
        expect(screen.getByText("Status")).toBeDefined()
    })

    it("renders SignInWithRds component when user is not authenticated", () => {
        vi.mocked(useGlobalStore).mockReturnValue({ user: null } as unknown as TGlobalStoreUser)

        render(<Navbar />)

        expect(screen.getByText("SignIn within rds")).toBeDefined()
    })

    it("renders user info when user is authenticated", () => {
        const mockUser = { name: "John Doe", profilePicture: "/path/to/image.jpg" }
        vi.mocked(useGlobalStore).mockReturnValue({ user: mockUser } as unknown as TGlobalStoreUser)

        render(<Navbar />)

        expect(screen.getByText("John Doe")).toBeDefined()
        expect(screen.getByAltText("John Doe")).toBeDefined()
    })

    it("navigation links have correct href attributes", () => {
        vi.mocked(useGlobalStore).mockReturnValue({ user: null } as unknown as TGlobalStoreUser)

        render(<Navbar />)

        const welcomeLink = screen.getByText("Welcome").closest("a")
        const membersLink = screen.getByText("Members").closest("a")
        const statusLink = screen.getByText("Status").closest("a")

        expect(welcomeLink?.getAttribute("href")).toBe(config.welcomeSiteUrl)
        expect(membersLink?.getAttribute("href")).toBe(config.membersSiteUrl)
        expect(statusLink?.getAttribute("href")).toBe(config.statusSiteUrl)
    })
})
