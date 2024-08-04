import { client } from "@/utils/client"
import * as Dto from "./skills.dto"
export class SkillsApi {
    public static async getAllPendingSkillRequests(): Promise<Dto.GetAllPendingSkillRequestsResDto> {
        const { data } = await client.get("/v1/skills/requests")
        return data
    }

    public static async getAllSkills(): Promise<Dto.TGetAllSkillsResDto> {
        const { data } = await client.get("/v1/skills")
        return data
    }

    public static async createSkill(body: Dto.CreateSkillReqDto): Promise<number> {
        const { status } = await client.post(`/v1/skills`, body)
        return status
    }

    public static async createEndorsement(params: Dto.CreateEndorsementReqDto): Promise<number> {
        const { status } = await client.post(`/v1/skills/${params.skillId}/endorsements`, params.body)
        return status
    }
}
