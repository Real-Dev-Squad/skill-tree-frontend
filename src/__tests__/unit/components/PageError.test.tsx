import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

import { PageError } from "@/components/page-error"

describe("PageError component", () => {
    afterEach(() => {
        cleanup()
    })

    it('renders the error message "Something went wrong! with a reload button"', () => {
        render(<PageError />)

        const errorMessage = screen.getByText(/something went wrong!/i)
        const reloadButton = screen.getByRole("button", { name: /reload page/i })
        expect(errorMessage).toBeDefined() // Check that the error message is rendered
        expect(reloadButton).toBeDefined() // Check that the reload button is rendered
    })

    it('triggers page reload when the "Reload page" button is clicked', () => {
        // Mock window.location.reload
        const reloadMock = vi.fn()
        Object.defineProperty(window, "location", {
            configurable: true,
            value: { reload: reloadMock },
        })

        render(<PageError />)

        const reloadButton = screen.getByRole("button", { name: /reload page/i })
        fireEvent.click(reloadButton)

        expect(reloadMock).toHaveBeenCalledTimes(1) // Ensure the page reload function is called
    })
})
