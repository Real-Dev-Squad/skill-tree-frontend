import { render, screen } from "@testing-library/react"
import { expect, test } from "vitest"

import Homepage from "@/pages"

//TODO: Needs modification
test("HomePage", () => {
    render(<Homepage />)
    expect(screen.getByRole("heading", { level: 1, name: "Welcome to Skilltree" })).toBeDefined()
})
