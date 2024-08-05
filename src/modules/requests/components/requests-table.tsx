import { MinimalUser } from "@/api/common/minimal-user.types"
import { GetAllPendingSkillRequestsResDto } from "@/api/skills/skills.dto"
import { Button } from "@/components/button"
import { cn } from "@/utils/classname"
import { EndorsementsGroup, TFormattedEndorsement } from "./endorsements-group"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { SkillsApi } from "@/api/skills"
import { UserSkillStatusEnum } from "@/api/skills/skills.enum"
import toast from "react-hot-toast"
import { toErrorMessage } from "@/utils/to-error-message"
import { AxiosError } from "axios"
import { TUserDetails } from "@/api/common/user.types"
import { useGlobalStore } from "@/store/global-store"
import { RequestTableEmptyState } from "./request-table-empty-state"

type CellProps = {
    className?: string
    children: React.ReactNode
}

const Cell = ({ className, children }: CellProps) => {
    return <div className={cn("px-2 text-sm font-normal", className)}>{children}</div>
}

type CommonProps = {
    children?: React.ReactNode
}

const Th = ({ children }: CommonProps) => {
    return (
        <th className="h-10 text-left text-sm font-medium text-gray-500">
            <Cell>{children}</Cell>
        </th>
    )
}

const Td = ({ children }: CommonProps) => {
    return (
        <td className="text-sm font-normal text-gray-800">
            <Cell className="flex h-11 items-center">{children}</Cell>
        </td>
    )
}

const TableHeader = () => {
    return (
        <thead className="border-y border-gray-100">
            <Th>Name</Th>
            <Th>Skill</Th>
            <Th>Endorsements</Th>
            <Th />
        </thead>
    )
}

type RequestActionsProps = {
    skillId: number
    endorseId: string
}

const RequestActions = ({ skillId, endorseId }: RequestActionsProps) => {
    const queryClient = useQueryClient()

    const approveRequestsMutation = useMutation({
        mutationFn: () =>
            SkillsApi.approveRejectSkillRequest({ skillId, body: { endorseId, action: UserSkillStatusEnum.APPROVED } }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["SkillsApi.getAllPendingSkillRequests"] })
            toast.success("Skill Request approved")
        },
        onError: (error: AxiosError<any>) => {
            toast.error(toErrorMessage(error))
        },
    })

    const rejectRequestsMutation = useMutation({
        mutationFn: () =>
            SkillsApi.approveRejectSkillRequest({ skillId, body: { endorseId, action: UserSkillStatusEnum.REJECTED } }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["SkillsApi.getAllPendingSkillRequests"] })
            toast.success("Skill Request rejected")
        },
        onError: (error: AxiosError<any>) => {
            toast.error(toErrorMessage(error))
        },
    })

    return (
        <div className="flex items-center gap-2">
            <Button
                size="xs"
                className="rounded-full"
                loading={approveRequestsMutation.isPending}
                onClick={() => approveRequestsMutation.mutate()}
            >
                Approve
            </Button>

            <Button
                size="xs"
                variant="ghost"
                className="rounded-full text-gray-500 hover:bg-red-100 hover:text-red-600 focus:bg-red-100 active:bg-red-200"
                loading={rejectRequestsMutation.isPending}
                onClick={() => rejectRequestsMutation.mutate()}
            >
                Reject
            </Button>
        </div>
    )
}

type TFormattedData = {
    skillId: number
    skillName: string
    endorse: TUserDetails
    endorsements: TFormattedEndorsement[]
}

type RequestsTableProps = {
    data: GetAllPendingSkillRequestsResDto
}

export const RequestsTable = ({ data }: RequestsTableProps) => {
    const isSuperUser = useGlobalStore((state) => state.user?.roles.super_user)

    const userIdToDetailsMap = data.users.reduce<Record<string, MinimalUser>>(
        (acc, user) => ({ ...acc, [user.id]: user }),
        {}
    )

    const formattedData = data.requests.map<TFormattedData>((request) => ({
        endorse: {
            id: request.endorseId,
            name: userIdToDetailsMap[request.endorseId].name,
            profilePicture: "", // TODO - @yesyash: Add profile picture
        },
        endorsements: request.endorsements.map<TFormattedEndorsement>((endorsement) => ({
            endorser: {
                id: endorsement.endorserId,
                name: userIdToDetailsMap[endorsement.endorserId].name,
                profilePicture: "", // TODO - @yesyash: Add profile picture
            },
            date: endorsement.endorsementDate,
            message: endorsement.message,
        })),
        skillId: request.skillId,
        skillName: request.skillName,
    }))

    if (!formattedData.length) {
        return (
            <div className="grid h-96 place-items-center border-t border-gray-100">
                <RequestTableEmptyState />
            </div>
        )
    }

    return (
        <table className="w-full text-left">
            <TableHeader />

            {formattedData.map((request) => (
                <tr>
                    <Td>{request.endorse.name}</Td>
                    <Td>{request.skillName}</Td>
                    <Td>
                        <EndorsementsGroup endorsements={request.endorsements} />
                    </Td>
                    <Td>
                        {isSuperUser && <RequestActions skillId={request.skillId} endorseId={request.endorse.id} />}
                    </Td>
                </tr>
            ))}
        </table>
    )
}
