import { AxiosError } from "axios"
import { describe, expect, it } from "vitest"

import { toErrorMessage } from "@/utils/to-error-message"

describe("toErrorMessage", () => {
    it("should return the error message from the response", () => {
        const mockError = {
            response: {
                data: {
                    message: "Custom error message",
                },
            },
        } as AxiosError

        const result = toErrorMessage(mockError)
        expect(result).toBe("Custom error message")
    })

    it("should return default message if error message is not provided", () => {
        const mockError = {} as AxiosError

        const result = toErrorMessage(mockError)
        expect(result).toBe("Something went wrong, please try again")
    })

    it("should return default message if response or data is undefined", () => {
        const mockError = {
            response: {
                data: undefined,
            },
        } as AxiosError

        const result = toErrorMessage(mockError)
        expect(result).toBe("Something went wrong, please try again")
    })
})
