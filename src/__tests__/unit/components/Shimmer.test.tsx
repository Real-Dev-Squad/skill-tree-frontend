import { cleanup, render } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"

import { Shimmer } from "@/components/shimmer" // Adjust the import path as necessary

describe("Shimmer component", () => {
    afterEach(() => {
        cleanup()
    })
    it("renders without crashing", () => {
        const { container } = render(<Shimmer />)
        expect(container.firstChild).toBeDefined()
    })

    it("applies default classes", () => {
        const { container } = render(<Shimmer />)
        const shimmerElement = container.firstChild as HTMLElement
        expect(shimmerElement.className).toContain("h-11")
        expect(shimmerElement.className).toContain("w-full")
        expect(shimmerElement.className).toContain("animate-pulse")
        expect(shimmerElement.className).toContain("rounded-lg")
        expect(shimmerElement.className).toContain("bg-gray-100")
    })

    it("applies additional classes when provided", () => {
        const { container } = render(<Shimmer className="custom-class" />)
        const shimmerElement = container.firstChild as HTMLElement
        expect(shimmerElement.className).toContain("custom-class")
    })

    it("combines default and custom classes correctly", () => {
        const { container } = render(<Shimmer className="custom-class" />)
        const shimmerElement = container.firstChild as HTMLElement
        expect(shimmerElement.className).toContain("h-11")
        expect(shimmerElement.className).toContain("w-full")
        expect(shimmerElement.className).toContain("animate-pulse")
        expect(shimmerElement.className).toContain("rounded-lg")
        expect(shimmerElement.className).toContain("bg-gray-100")
        expect(shimmerElement.className).toContain("custom-class")
    })
})
