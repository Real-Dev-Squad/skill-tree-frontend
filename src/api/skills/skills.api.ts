import { client } from "@/utils/client"
import { createEndorsementReqDto, GetAllPendingSkillRequestsResDto, TGetAllSkillsResDto } from "./skills.dto"

export class SkillsApi {
    public static async getAllPendingSkillRequests(): Promise<GetAllPendingSkillRequestsResDto> {
        const { data } = await client.get("/v1/skills/requests")
        return data
    }

    public static async getAllSkills(): Promise<TGetAllSkillsResDto> {
        const { data } = await client.get("/v1/skills")
        return data
    }

    public static async createEndorsement(params: createEndorsementReqDto): Promise<number> {
        const { status } = await client.post(`/v1/skills/${params.skillId}/endorsements`, params.body)
        return status
    }
}
