import { TEndorsement } from "../common/endosement.types"
import { MinimalUser } from "../common/minimal-user.types"

import { SkillTypeEnum, UserSkillStatusEnum } from "./skills.enum"
import { TCreteEndorsementBody } from "./skills.types"

export type SkillRequests = {
    skillId: number
    skillName: string
    endorseId: string
    status: UserSkillStatusEnum
    endorsements: TEndorsement[]
}

export type GetAllPendingSkillsReqDto = {
    status?: UserSkillStatusEnum
}

export type GetAllPendingSkillsResDto = {
    requests: SkillRequests[]
    users: MinimalUser[]
}

export type TSkill = {
    id: number
    name: string
    type: SkillTypeEnum
}

export type CreateSkillReqDto = {
    name: string
    type: SkillTypeEnum
}

export type TGetAllSkillsResDto = TSkill[]

export type CreateEndorsementReqDto = {
    skillId: number
    body: TCreteEndorsementBody
}

export type SkillRequestActionRequestDto = {
    endorseId: string
    action: UserSkillStatusEnum
}

export type ApproveRejectSkillRequestReqDto = {
    skillId: number
    body: SkillRequestActionRequestDto
}
