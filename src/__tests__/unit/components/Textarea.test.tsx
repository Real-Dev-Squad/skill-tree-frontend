import { cleanup, fireEvent, render } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

import { Textarea } from "@/components/textarea" // Adjust the import path as necessary

afterEach(() => {
    cleanup()
})

describe("Textarea component", () => {
    describe("Controlled behavior", () => {
        it("updates value when provided as a prop", () => {
            const { getByRole, rerender } = render(<Textarea value="" />)
            const textareaElement = getByRole("textbox") as HTMLTextAreaElement

            expect(textareaElement.value).toBe("")

            rerender(<Textarea value="updated value" />)

            expect(textareaElement.value).toBe("updated value")
        })

        it("calls onChange handler when typing", () => {
            const handleChange = vi.fn()
            const { getByRole } = render(<Textarea value="" onChange={handleChange} />)
            const textareaElement = getByRole("textbox") as HTMLTextAreaElement

            fireEvent.change(textareaElement, { target: { value: "test input" } })

            expect(handleChange).toHaveBeenCalledTimes(1)
            expect(handleChange).toHaveBeenCalledWith("test input")
        })
    })

    describe("Uncontrolled behavior", () => {
        it("updates its value when typing without onChange handler", () => {
            const { getByRole } = render(<Textarea />)
            const textareaElement = getByRole("textbox") as HTMLTextAreaElement

            fireEvent.change(textareaElement, { target: { value: "test input" } })

            expect(textareaElement.value).toBe("test input")
        })
    })

    describe("Props and rendering", () => {
        it("renders with a label when provided", () => {
            const { getByText } = render(<Textarea label="Test Label" />)
            expect(getByText("Test Label")).toBeDefined()
        })

        it("displays an error message when provided", () => {
            const { getByText } = render(<Textarea errorMessage="This is an error" />)
            expect(getByText("This is an error")).toBeDefined()
        })

        it("applies custom className", () => {
            const { container } = render(<Textarea className="custom-class" />)
            expect(container.querySelector(".custom-class")).toBeDefined()
        })

        it("sets the correct number of rows", () => {
            const { getByRole } = render(<Textarea rows={10} />)
            const textareaElement = getByRole("textbox") as HTMLTextAreaElement
            expect(textareaElement.rows).toBe(10)
        })

        it("uses default 5 rows when not specified", () => {
            const { getByRole } = render(<Textarea />)
            const textareaElement = getByRole("textbox") as HTMLTextAreaElement
            expect(textareaElement.rows).toBe(5)
        })

        it("sets the placeholder correctly", () => {
            const placeholder = "Enter your message here"
            const { getByPlaceholderText } = render(<Textarea placeholder={placeholder} />)
            expect(getByPlaceholderText(placeholder)).toBeDefined()
        })
    })
})
