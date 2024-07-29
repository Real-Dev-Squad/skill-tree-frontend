import { TEndorsement } from "../common/endosement.types"
import { MinimalUser } from "../common/minimal-user.types"

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
