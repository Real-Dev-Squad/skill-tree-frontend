import { rdsClient } from "@/utils/client"
import { RdsUserSelfResDto } from "./rds.dto"

export class RdsApi {
    public static async getCurrentUserData(): Promise<RdsUserSelfResDto> {
        const { data } = await rdsClient.get("/users/self")
        return data
    }
}
