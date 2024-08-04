import { TEndorsement } from "../common/endosement.types"
import { MinimalUser } from "../common/minimal-user.types"
import { SkillTypeEnum } from "./skills.enum"

export type SkillRequests = {
    skillId: number
    skillName: string
    endorseId: string
    endorsements: TEndorsement[]
}

export type GetAllPendingSkillRequestsResDto = {
    requests: SkillRequests[]
    users: MinimalUser[]
}

export type TSkill = {
    id: number
    name: string
    type: SkillTypeEnum
}

export type TGetAllSkillsResDto = TSkill[]
