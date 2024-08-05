import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useRouter } from "next/router"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

import { SkillsApi } from "@/api/skills"
import { BackButton } from "@/components/back-button"
import { Button } from "@/components/button"
import { Form } from "@/components/form"
import { Textarea } from "@/components/textarea"
import { RootLayout } from "@/layouts/root-layout"
import { ROUTES } from "@/routes"
import { toErrorMessage } from "@/utils/to-error-message"

import { RdsUsersCombobox } from "./components/rds-users-combobox"
import { SkillListCombobox } from "./components/skill-list-combobox"

const SKILL_ID_REQUIRED_ERROR = "Please select a skill to endorse"
const ENDORSE_ID_REQUIRED_ERROR = "Please select a user to endorse"
const MESSAGE_REQUIRED_ERROR = "Please enter a message"

const endorsementFormSchema = z.object({
    skillId: z.number({ required_error: SKILL_ID_REQUIRED_ERROR }),
    endorseId: z.string({ required_error: ENDORSE_ID_REQUIRED_ERROR }).min(1, { message: ENDORSE_ID_REQUIRED_ERROR }),
    message: z.string({ required_error: MESSAGE_REQUIRED_ERROR }).min(1, { message: MESSAGE_REQUIRED_ERROR }),
})

type TEndorsementFormSchema = z.infer<typeof endorsementFormSchema>

const EndorsementForm = () => {
    const { push } = useRouter()
    const queryClient = useQueryClient()

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<TEndorsementFormSchema>({
        resolver: zodResolver(endorsementFormSchema),
    })

    const createEndorsementMutation = useMutation({
        mutationFn: SkillsApi.createEndorsement,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["SkillsApi.getAllPendingSkillRequests"] })
            toast.success("Endorsement created successfully")

            push(ROUTES.requests)
        },
        onError: (error: AxiosError<unknown>) => {
            toast.error(toErrorMessage(error))
        },
    })

    const onSubmit = handleSubmit((data) => {
        createEndorsementMutation.mutate({
            skillId: data.skillId,
            body: { endorseId: data.endorseId, message: data.message },
        })
    })

    return (
        <Form className="space-y-4" onSubmit={onSubmit}>
            <Controller
                control={control}
                name="endorseId"
                render={({ field }) => (
                    <RdsUsersCombobox
                        label="User"
                        value={field.value}
                        errorMessage={errors.endorseId?.message}
                        placeholder="Select the user you want to endorse"
                        onChange={(id) => field.onChange(id)}
                    />
                )}
            />

            <Controller
                control={control}
                name="skillId"
                render={({ field }) => (
                    <SkillListCombobox
                        label="Skill"
                        value={field.value}
                        errorMessage={errors.skillId?.message}
                        placeholder="Select the skill you want to endorse for"
                        onChange={(id) => field.onChange(id)}
                    />
                )}
            />

            <Controller
                control={control}
                name="message"
                render={({ field }) => (
                    <Textarea
                        label="Message"
                        value={field.value}
                        errorMessage={errors.message?.message}
                        placeholder="Enter your reason for endorsement"
                        onChange={(message) => field.onChange(message)}
                    />
                )}
            />

            <Button size="sm" loading={createEndorsementMutation.isPending}>
                Create Endorsement
            </Button>
        </Form>
    )
}

export const CreateEndorsement = () => {
    return (
        <RootLayout>
            <div className="mx-auto w-full max-w-3xl p-6">
                <BackButton className="-ml-2 mb-6" />

                <div className="rounded-lg border border-gray-200 bg-white p-6">
                    <h1 className="pb-6 text-3xl font-bold text-gray-800">Endorse a user</h1>

                    <EndorsementForm />
                </div>
            </div>
        </RootLayout>
    )
}
