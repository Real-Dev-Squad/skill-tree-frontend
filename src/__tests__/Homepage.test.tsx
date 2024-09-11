import { render, screen } from "@testing-library/react"
import { expect, test } from "vitest"

import Homepage from "@/pages"

// TODO: Requires modification:
// 1. Only the heading tag has been added to verify that the tests are working.
// 2. Once the tests are set up, verify other cases.
test("HomePage", () => {
    render(<Homepage />)
    expect(screen.getByRole("heading", { level: 1, name: "Welcome to Skilltree" })).toBeDefined()
})
