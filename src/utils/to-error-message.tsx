import { AxiosError } from "axios"

export const toErrorMessage = (error: AxiosError<any>) => {
    const message = error.response?.data.message
    return message || "Something went wrong, please try again"
}
