import React from "react"
import { render, screen, cleanup } from "@testing-library/react"
import { describe, it, expect, vi, afterEach } from "vitest"
import { Avatar } from "@/components/avatar"

// Mock Next.js Image component
vi.mock("next/image", () => ({
    default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}))
//It cleans up the dom after each test
afterEach(() => {
    cleanup()
})

describe("Avatar", () => {
    it("renders an image when src is provided", () => {
        render(<Avatar src="/test-image.jpg" alt="Test Avatar" />)
        const img = screen.getByRole("img")
        expect(img).toBeDefined()
        expect(img.getAttribute("src")).toBe("/test-image.jpg")
    })

    it("renders fallback text when src is empty", () => {
        render(<Avatar src="" alt="Test Avatar" fallback="T" />)
        const fallback = screen.getByText("T")
        expect(fallback).toBeDefined()
        expect(fallback.tagName).toBe("SPAN")
        expect(fallback.className).includes("font-medium uppercase")
    })

    it("applies custom className", () => {
        render(<Avatar src="/test-image.jpg" alt="Test Avatar" className="custom-class" />)
        const avatar = screen.getByRole("img").parentElement
        expect(avatar?.className).toContain("custom-class")
    })

    it("applies different size variant", () => {
        render(<Avatar src="/test-image.jpg" alt="Test Avatar" size="lg" />)
        render(<Avatar src="/test-image.jpg" alt="Test Avatar" size="sm" />)

        const [lgAvatar, smAvatar] = screen.getAllByRole("img").map((img) => img.parentElement)

        expect(lgAvatar?.className).toContain("w-12 h-12")
        expect(smAvatar?.className).toContain("w-8 h-8")
    })

    it("uses medium size as default", () => {
        render(<Avatar src="/test-image.jpg" alt="Test Avatar" />)
        const avatar = screen.getByRole("img").parentElement
        expect(avatar?.className).toContain("w-10 h-10")
    })
})
