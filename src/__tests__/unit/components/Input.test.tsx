import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

import { Input } from "@/components/input"

afterEach(() => {
    cleanup()
})

describe("Input component", () => {
    describe("Controlled behavior", () => {
        it("updates value when provided as a prop", () => {
            const { getByRole, rerender } = render(<Input value="" />)
            const inputElement = getByRole("textbox") as HTMLInputElement

            expect(inputElement.getAttribute("value")).toBe("")

            rerender(<Input value="updated value" />)

            expect(inputElement.getAttribute("value")).toBe("updated value")
        })

        it("calls onChange handler when typing but does not update its own value", () => {
            const handleChange = vi.fn()
            const { getByRole } = render(<Input value="" onChange={handleChange} />)
            const inputElement = getByRole("textbox") as HTMLInputElement

            fireEvent.input(inputElement, { target: { value: "test input" } })

            expect(handleChange).toHaveBeenCalledTimes(1)
            expect(inputElement.getAttribute("value")).toBe("")
        })
    })

    describe("Uncontrolled behavior", () => {
        it("updates its value when typing without onChange handler", () => {
            const { getByRole } = render(<Input />)
            const inputElement = getByRole("textbox") as HTMLInputElement

            fireEvent.input(inputElement, { target: { value: "test input" } })

            expect(inputElement.value).toBe("test input")
        })
    })

    describe("Partially controlled behavior", () => {
        it("calls onChange handler when typing and may update its own value", () => {
            const handleChange = vi.fn()
            const { getByRole } = render(<Input onChange={handleChange} />)
            const inputElement = getByRole("textbox") as HTMLInputElement

            fireEvent.input(inputElement, { target: { value: "test input" } })

            expect(handleChange).toHaveBeenCalledTimes(1)

            expect(inputElement.value).toBe("test input")
        })
    })

    describe("Other behaviors", () => {
        it("renders with a label when provided", () => {
            const { getByText } = render(<Input label="Test Label" />)
            expect(getByText("Test Label")).toBeDefined()
        })

        it("displays an error message when provided", () => {
            const { getByText } = render(<Input errorMessage="This is an error" />)
            expect(getByText("This is an error")).toBeDefined()
        })

        it("applies custom className", () => {
            const { container } = render(<Input className="custom-class" />)
            expect(container.querySelector(".custom-class")).toBeDefined()
        })

        it("disables the input when disabled prop is passed", () => {
            render(<Input disabled={true} />)
            const inputElement = screen.getByRole("textbox")
            expect(inputElement.getAttribute("disabled")).toBe("") // Check if the input is disabled
        })
    })
})
