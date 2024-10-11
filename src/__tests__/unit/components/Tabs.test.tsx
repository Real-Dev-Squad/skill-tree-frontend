import { cleanup, render } from "@testing-library/react"
import { usePathname } from "next/navigation"
import { afterAll, describe, expect, it, vi } from "vitest"

import { Tabs, TTab } from "@/components/tabs"

// Mock Next.js components and hooks
vi.mock("next/navigation", () => ({
    usePathname: vi.fn(),
}))

describe("Tabs", () => {
    afterAll(() => {
        cleanup()
    })
    const mockTabs: TTab[] = [
        { order: 2, label: "Tab 2", href: "/tab2" },
        { order: 1, label: "Tab 1", href: "/tab1" },
        { order: 3, label: "Tab 3", href: "/tab3" },
    ]

    it("renders all tabs", () => {
        const { getByText } = render(<Tabs tabs={mockTabs} />)
        expect(getByText("Tab 1")).toBeDefined()
        expect(getByText("Tab 2")).toBeDefined()
        expect(getByText("Tab 3")).toBeDefined()
    })

    it("sorts tabs by order", () => {
        const { container } = render(<Tabs tabs={mockTabs} />)

        const tabElements = container.querySelectorAll("a")
        expect(tabElements[0].textContent).toBe("Tab 1")
        expect(tabElements[1].textContent).toBe("Tab 2")
        expect(tabElements[2].textContent).toBe("Tab 3")
    })

    it("applies active style to current tab", () => {
        vi.mocked(usePathname).mockReturnValue("/tab2")

        const { container } = render(<Tabs tabs={mockTabs} />)
        const tabElements = container.querySelectorAll("a")
        expect(tabElements[1].className).toContain("bg-white")
        expect(tabElements[0].className).toContain("bg-transparent")
        expect(tabElements[2].className).toContain("bg-transparent")
    })

    it("applies correct href to each tab", () => {
        const { container } = render(<Tabs tabs={mockTabs} />)

        const tabElements = container.querySelectorAll("a")
        expect(tabElements[0].getAttribute("href")).toBe("/tab1")
        expect(tabElements[1].getAttribute("href")).toBe("/tab2")
        expect(tabElements[2].getAttribute("href")).toBe("/tab3")
    })
})
