import { render, screen, fireEvent, cleanup } from "@testing-library/react"
import Link from "next/link"
import { afterEach, describe, expect, it, vi } from "vitest"

import { Button } from "@/components/button"

afterEach(() => {
    cleanup()
})

describe("Button component", () => {
    it("renders with default props", () => {
        render(<Button>Click me</Button>)

        const button = screen.getByRole("button", { name: /click me/i })
        expect(button).toBeTruthy() // Ensure button renders
        expect(button.className).toContain("bg-blue-600") // Default variant
        expect(button.className).toContain("h-10") // Default size
    })

    it("calls onClick when clicked", () => {
        const handleClick = vi.fn()
        render(<Button onClick={handleClick}>Click me</Button>)

        const button = screen.getByRole("button", { name: /click me/i })
        fireEvent.click(button)

        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it("does not call onClick when disabled", () => {
        const handleClick = vi.fn()
        render(
            <Button disabled onClick={handleClick}>
                Click me
            </Button>
        )
        const button = screen.getByRole("button", { name: /click me/i })
        fireEvent.click(button)

        expect(handleClick).toHaveBeenCalledTimes(0) // Ensure click doesn't trigger when disabled
    })

    it("renders loading spinner when loading", () => {
        render(<Button loading>Click me</Button>)

        const loader = document.querySelector(".animate-spin")

        expect(loader).toBeTruthy()
    })

    it("does not trigger click when loading", () => {
        const handleClick = vi.fn()
        render(
            <Button loading onClick={handleClick}>
                Click me
            </Button>
        )

        const button = screen.getByRole("button", { name: /click me/i })
        fireEvent.click(button)

        expect(handleClick).toHaveBeenCalledTimes(0) // No click trigger when loading
    })

    it("renders as a different element when asChild is true", () => {
        render(
            <Button asChild>
                <Link href="/">Link</Link>
            </Button>
        )

        const link = screen.getByRole("link", { name: /link/i })
        expect(link.tagName).toBe("A") // Ensure element rendered as anchor
    })

    it("applies different styles when variant and size are changed", () => {
        render(
            <Button variant={"secondary"} size={"sm"}>
                Secondary
            </Button>
        )

        const button = screen.getByRole("button", { name: /secondary/i })
        expect(button.className).toContain("h-8") // Check class for variant
        expect(button.className).toContain("bg-blue-50") // Check class for variant
        expect(button.className).toContain("text-blue-600") // Check class for variant
    })
})
