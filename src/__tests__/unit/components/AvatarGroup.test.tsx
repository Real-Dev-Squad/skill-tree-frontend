import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"

import { AvatarGroup, TProfile } from "@/components/avatar-group"

// Automatically unmount and cleanup DOM after each test
afterEach(() => {
    cleanup()
})

describe("AvatarGroup Component", () => {
    const mockProfiles: TProfile[] = [
        { name: "Sunil Kumar", profilePicture: "/path/to/sunil.jpg" },
        { name: "Yash Raj", profilePicture: "/path/to/yash.jpg" },
        { name: "Prakash", profilePicture: "/path/to/prakash.jpg" },
        { name: "Tejas", profilePicture: "/path/to/tejas.jpg" },
    ]

    it("displays all avatars when 3 or fewer profiles are provided", () => {
        const profiles = mockProfiles.slice(0, 3)
        render(<AvatarGroup profiles={profiles} />)

        const avatarImages = screen.getAllByRole("img")
        expect(avatarImages).toHaveLength(3)

        const countIndicator = screen.queryByText(/\+\d+/)
        expect(countIndicator).toBeNull()
    })

    it("displays only 3 avatars when more than 3 profiles are provided", () => {
        render(<AvatarGroup profiles={mockProfiles} />)
        const avatarImages = screen.getAllByRole("img")
        expect(avatarImages).toHaveLength(3)
    })

    it("displays the correct count indicator when more than 3 profiles are provided", () => {
        render(<AvatarGroup profiles={mockProfiles} />)

        const remainingCount = mockProfiles.length - 3
        const countIndicator = screen.getByText(`+${remainingCount}`)
        expect(countIndicator).toBeDefined()
    })

    it("applies the correct z-index to avatar containers", () => {
        render(<AvatarGroup profiles={mockProfiles} />)
        const avatarContainers = screen.getAllByRole("img")

        avatarContainers.forEach((container, index) => {
            const parentContainer = container?.parentElement?.parentElement
            expect(parentContainer?.style.zIndex).toBe(`${30 - index}`)
        })
    })

    it("renders nothing when the profiles array is empty", () => {
        render(<AvatarGroup profiles={[]} />)

        const avatars = screen.queryAllByRole("img")
        expect(avatars).toHaveLength(0)

        // Check that no count indicator (e.g., "+X") is rendered
        const countIndicator = screen.queryByText(/\+\d+/)
        expect(countIndicator).toBeNull()
    })
})
