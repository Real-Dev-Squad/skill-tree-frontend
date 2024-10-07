import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { useRouter } from "next/navigation"
import { afterEach, describe, expect, it, vi } from "vitest"

import { BackButton } from "@/components/back-button"
// Mock the next/navigation useRouter hook
const mockPush = vi.fn()
const mockBack = vi.fn()

vi.mock("next/navigation", () => ({
    useRouter: () => ({
        push: mockPush,
        back: mockBack,
    }),
}))
describe("BackButton Component", () => {
    afterEach(() => {
        cleanup()
    })

    it("should navigate back if no route prop is provided", () => {
        const { back } = useRouter()
        render(<BackButton />)

        const button = screen.getByRole("button", { name: /back/i })
        fireEvent.click(button)

        expect(back).toHaveBeenCalledTimes(1) // Check that 'back' is called
    })

    it("should navigate to the provided route when route prop is specified", () => {
        const { push } = useRouter()
        render(<BackButton route="/home" />)

        const button = screen.getByRole("button", { name: /back/i })
        fireEvent.click(button)

        expect(push).toHaveBeenCalledWith("/home") // Check that 'push' is called with the correct route
    })

    it('should render with default label "Back" if no label is provided', () => {
        render(<BackButton />)

        const button = screen.getByRole("button", { name: /back/i })
        expect(button).toBeTruthy()
    })

    it("should render the correct label when label prop is provided", () => {
        render(<BackButton label="Go Home" />)

        const button = screen.getByRole("button", { name: /go home/i })
        expect(button).toBeTruthy()
    })

    it("should render left arrow icon", () => {
        render(<BackButton />)
        const arrowLeftIcon = document.querySelector("svg")
        expect(arrowLeftIcon).toBeTruthy()
    })
})
