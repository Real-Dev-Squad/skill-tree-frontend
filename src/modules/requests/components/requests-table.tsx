import { MinimalUser } from "@/api/common/minimal-user.types"
import { GetAllPendingSkillRequestsResDto } from "@/api/skills/skills.dto"
import { Button } from "@/components/button"
import { cn } from "@/utils/classname"
import { EndorsementsGroup, TFormattedEndorsement } from "./endorsements-group"

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

const RequestActions = () => {
    return (
        <div className="flex items-center gap-2">
            <Button size="xs" className="rounded-full">
                Approve
            </Button>

            <Button
                size="xs"
                variant="ghost"
                className="rounded-full text-gray-500 hover:bg-red-100 hover:text-red-600 focus:bg-red-100 active:bg-red-200"
            >
                Reject
            </Button>
        </div>
    )
}

type TUserDetails = {
    name: string
    profilePicture: string
}

type TFormattedData = {
    endorse: TUserDetails
    skill: string
    endorsements: TFormattedEndorsement[]
}

type RequestsTableProps = {
    data: GetAllPendingSkillRequestsResDto
}

export const RequestsTable = ({ data }: RequestsTableProps) => {
    const userIdToDetailsMap = data.users.reduce<Record<string, MinimalUser>>(
        (acc, user) => ({ ...acc, [user.id]: user }),
        {}
    )

    const formattedData = data.requests.map<TFormattedData>((request) => ({
        endorse: {
            name: userIdToDetailsMap[request.endorseId].name,
            profilePicture: "", // TODO - @yesyash: Add profile picture
        },
        endorsements: request.endorsements.map<TFormattedEndorsement>((endorsement) => ({
            endorser: {
                name: userIdToDetailsMap[endorsement.endorserId].name,
                profilePicture: "", // TODO - @yesyash: Add profile picture
            },
            date: endorsement.endorsementDate,
            message: endorsement.message,
        })),
        skill: request.skillName,
    }))

    return (
        <table className="w-full text-left">
            <TableHeader />

            {formattedData.map((request) => (
                <tr>
                    <Td>{request.endorse.name}</Td>
                    <Td>{request.skill}</Td>
                    <Td>
                        <EndorsementsGroup endorsements={request.endorsements} />
                    </Td>
                    <Td>
                        <RequestActions />
                    </Td>
                </tr>
            ))}
        </table>
    )
}
