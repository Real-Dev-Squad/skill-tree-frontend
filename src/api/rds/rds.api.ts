import { rdsClient } from "@/utils/client"

import { GetAllRdsUsersReqDto, GetAllRdsUsersResDto, RdsUserSelfResDto } from "./rds.dto"

export class RdsApi {
    public static async getCurrentUserData(): Promise<RdsUserSelfResDto> {
        const { data } = await rdsClient.get("/users?profile=true")
        return data
    }

    public static async getAllUsers(params?: GetAllRdsUsersReqDto): Promise<GetAllRdsUsersResDto> {
        const { data } = await rdsClient.get("/users", { params })
        return data
    }
}
