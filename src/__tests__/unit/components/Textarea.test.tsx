import { cleanup, fireEvent, render } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

import { Textarea } from "@/components/textarea"

describe("Textarea component", () => {
    afterEach(() => {
        cleanup()
    })

    it("renders with provided props", () => {
        const handleChange = vi.fn()
        const { getByRole, getByText } = render(
            <Textarea
                label="Test Label"
                value="Test Value"
                onChange={handleChange}
                placeholder="Test Placeholder"
                errorMessage="Test Error"
                rows={3}
            />
        )
        const textarea = getByRole("textbox") as HTMLTextAreaElement
        expect(textarea.value).toBe("Test Value")
        expect(textarea.getAttribute("placeholder")).toBe("Test Placeholder")
        expect(textarea.getAttribute("rows")).toBe("3")
        expect(getByText("Test Label")).toBeDefined()
        expect(getByText("Test Error")).toBeDefined()
    })

    it("calls onChange when value changes", () => {
        const handleChange = vi.fn()
        const { getByRole } = render(<Textarea onChange={handleChange} />)
        const textarea = getByRole("textbox")

        fireEvent.change(textarea, { target: { value: "New Value" } })

        expect(handleChange).toHaveBeenCalledTimes(1)
        expect(handleChange).toHaveBeenCalledWith("New Value")
    })

    it("applies custom className", () => {
        const { container } = render(<Textarea className="custom-class" />)
        const textareaElement = container.querySelector("textarea")
        expect(textareaElement?.classList.contains("custom-class")).toBe(true)
    })

    it("uses default rows when not specified", () => {
        const { getByRole } = render(<Textarea />)
        const textarea = getByRole("textbox")
        expect(textarea.getAttribute("rows")).toBe("5")
    })

    it("does not render label when not provided", () => {
        const { queryByText } = render(<Textarea />)
        expect(queryByText(/label/i)).toBeNull()
    })

    it("does not render error message when not provided", () => {
        const { queryByText } = render(<Textarea />)
        expect(queryByText(/error/i)).toBeNull()
    })
})
