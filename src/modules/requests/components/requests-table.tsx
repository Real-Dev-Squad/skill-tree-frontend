import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import toast from "react-hot-toast"

import { MinimalUser } from "@/api/common/minimal-user.types"
import { TUserDetails } from "@/api/common/user.types"
import { SkillsApi } from "@/api/skills"
import { GetAllPendingSkillsResDto } from "@/api/skills/skills.dto"
import { UserSkillStatusEnum } from "@/api/skills/skills.enum"
import { Button } from "@/components/button"
import { useGlobalStore } from "@/store/global-store"
import { cn } from "@/utils/classname"
import { toErrorMessage } from "@/utils/to-error-message"

import { EndorsementsGroup, TFormattedEndorsement } from "./endorsements-group"
import { RequestTableEmptyState } from "./request-table-empty-state"

type CellProps = {
    className?: string
    children: React.ReactNode
}

const Cell = ({ className, children }: CellProps) => {
    return <div className={cn("px-4 text-sm font-normal", className)}>{children}</div>
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

type TdProps = CommonProps & {
    classNames?: Partial<{ td: string; cell: string }>
}

const Td = ({ children, classNames }: TdProps) => {
    return (
        <td className={cn("text-sm font-normal text-gray-800", classNames?.td)}>
            <Cell className={cn("flex h-11 items-center", classNames?.cell)}>{children}</Cell>
        </td>
    )
}

const TableHeader = () => {
    return (
        <thead className="border-b border-gray-200 bg-gray-50">
            <Th>Name</Th>
            <Th>Skill</Th>
            <Th>Skill status</Th>
            <Th>Endorsements</Th>
            <Th />
        </thead>
    )
}

type RequestActionsProps = {
    skillId: number
    endorseId: string
    skillStatus: UserSkillStatusEnum
}

const RequestActions = ({ skillId, endorseId, skillStatus }: RequestActionsProps) => {
    const queryClient = useQueryClient()

    const approveRequestsMutation = useMutation({
        mutationFn: () =>
            SkillsApi.approveRejectSkillRequest({ skillId, body: { endorseId, action: UserSkillStatusEnum.APPROVED } }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["SkillsApi.getAllPendingSkillRequests"] })
            toast.success("Skill Request approved")
        },
        onError: (error: AxiosError<unknown>) => {
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
        onError: (error: AxiosError<unknown>) => {
            toast.error(toErrorMessage(error))
        },
    })

    if (skillStatus !== UserSkillStatusEnum.PENDING) {
        return <div className="text-gray-500">--</div>
    }

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
    skillStatus: UserSkillStatusEnum
    endorsements: TFormattedEndorsement[]
}

type RequestsTableProps = {
    data: GetAllPendingSkillsResDto
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
        skillStatus: request.status,
    }))

    if (!formattedData.length) {
        return (
            <div className="grid h-96 place-items-center border-t border-gray-100">
                <RequestTableEmptyState />
            </div>
        )
    }

    return (
        <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full text-left">
                <TableHeader />

                {formattedData.map((request, index) => (
                    <tr key={index} className="h-12 border-b border-gray-200 last:border-none">
                        <Td>{request.endorse.name}</Td>
                        <Td>{request.skillName}</Td>
                        <Td classNames={{ cell: "capitalize" }}>{request.skillStatus.toLowerCase()}</Td>
                        <Td>
                            <EndorsementsGroup endorsements={request.endorsements} />
                        </Td>
                        <Td>
                            {isSuperUser && (
                                <RequestActions
                                    skillId={request.skillId}
                                    endorseId={request.endorse.id}
                                    skillStatus={request.skillStatus}
                                />
                            )}
                        </Td>
                    </tr>
                ))}
            </table>
        </div>
    )
}
