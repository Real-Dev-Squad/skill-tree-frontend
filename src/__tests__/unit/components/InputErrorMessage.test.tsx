import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"

import { InputErrorMessage } from "@/components/input-error-message"

describe("InputErrorMessage component", () => {
    afterEach(() => {
        cleanup()
    })

    it("renders the error message when the show prop is true", () => {
        render(<InputErrorMessage show={true} message="This is an error" />)

        const errorMessage = screen.getByText(/this is an error/i)
        expect(errorMessage).toBeDefined() // Check that the error message is rendered
    })

    it("does not render the error message when the show prop is false", () => {
        render(<InputErrorMessage show={false} message="This is an error" />)

        const errorMessage = screen.queryByText(/this is an error/i)
        expect(errorMessage).toBeNull() // Check that the error message is not rendered when show is false
    })
})
