import axios, { AxiosResponse } from "axios"

import { config } from "@/config"
import { ROUTES } from "@/routes"

const responseInterceptor = (response: AxiosResponse<any, any>) => {
    return response
}

const errorHandler = (error: any) => {
    if (error.response.status === 401) {
        window.location.replace(ROUTES.signIn)
    }

    return Promise.reject(error)
}

export const client = axios.create({
    baseURL: config.skillTreeBackendBaseUrl,
    withCredentials: true,
})

export const rdsClient = axios.create({
    baseURL: config.rdsBackendBaseUrl,
    withCredentials: true,
})

client.interceptors.response.use(responseInterceptor, errorHandler)
rdsClient.interceptors.response.use(responseInterceptor, errorHandler)
