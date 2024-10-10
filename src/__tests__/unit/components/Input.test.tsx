import { cleanup, fireEvent, render } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

import { Input } from "@/components/input"

describe("Input component", () => {
    afterEach(() => {
        cleanup()
    })

    it("renders with provided props", () => {
        const handleChange = vi.fn()
        const { getByRole, getByText } = render(
            <Input
                label="Test Label"
                value="Test Value"
                onChange={handleChange}
                placeholder="Test Placeholder"
                errorMessage="Test Error"
            />
        )
        const input = getByRole("textbox")
        expect(input.getAttribute("value")).toBe("Test Value")
        expect(input.getAttribute("placeholder")).toBe("Test Placeholder")
        expect(getByText("Test Label")).toBeDefined()
        expect(getByText("Test Error")).toBeDefined()
    })

    it("calls onChange when value changes", () => {
        const handleChange = vi.fn()
        const { getByRole } = render(<Input onChange={handleChange} />)
        const input = getByRole("textbox")

        fireEvent.change(input, { target: { value: "New Value" } })

        expect(handleChange).toHaveBeenCalledTimes(1)
    })

    it("applies custom className", () => {
        const { container } = render(<Input className="custom-class" />)
        const inputElement = container.querySelector("input")
        expect(inputElement?.classList.contains("custom-class")).toBe(true)
    })

    it("disables the input when disabled prop is passed", () => {
        const { getByRole } = render(<Input disabled={true} />)
        const input = getByRole("textbox")
        expect(input.getAttribute("disabled")).toBe("")
    })
})
