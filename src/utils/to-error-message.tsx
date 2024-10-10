import { AxiosError } from "axios"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toErrorMessage = (error: AxiosError<any>) => {
    const message = error.response?.data?.message
    return message || "Something went wrong, please try again"
}
