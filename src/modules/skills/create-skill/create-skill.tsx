import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useRouter } from "next/router"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

import { SkillsApi } from "@/api/skills"
import { SkillTypeEnum } from "@/api/skills/skills.enum"
import { BackButton } from "@/components/back-button"
import { Button } from "@/components/button"
import { Form } from "@/components/form"
import { Input } from "@/components/input"
import { RootLayout } from "@/layouts/root-layout"
import { ROUTES } from "@/routes"
import { toErrorMessage } from "@/utils/to-error-message"

const SKILL_NAME_REQUIRED_ERROR = "Please enter a skill name"

const createSkillFormSchema = z.object({
    name: z.string({ required_error: SKILL_NAME_REQUIRED_ERROR }).min(1, { message: SKILL_NAME_REQUIRED_ERROR }),
})

type TCreateSkillFormSchema = z.infer<typeof createSkillFormSchema>

const EndorsementForm = () => {
    const { push } = useRouter()
    const queryClient = useQueryClient()

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<TCreateSkillFormSchema>({
        resolver: zodResolver(createSkillFormSchema),
    })

    const createSkillMutation = useMutation({
        mutationFn: SkillsApi.createSkill,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["SkillsApi.getAllSkills"] })
            toast.success("Skill Created")

            push(ROUTES.requests)
        },
        onError: (error: AxiosError<unknown>) => {
            toast.error(toErrorMessage(error))
        },
    })

    const onSubmit = handleSubmit((data) => {
        createSkillMutation.mutate({ name: data.name, type: SkillTypeEnum.ATOMIC })
    })

    return (
        <Form className="space-y-4" onSubmit={onSubmit}>
            <Controller
                control={control}
                name="name"
                render={({ field }) => (
                    <Input
                        label="Message"
                        value={field.value}
                        errorMessage={errors.name?.message}
                        placeholder="Enter skill name"
                        onChange={(message) => field.onChange(message)}
                    />
                )}
            />

            <Button size="sm" loading={createSkillMutation.isPending}>
                Create Skill
            </Button>
        </Form>
    )
}

export const CreateSkill = () => {
    return (
        <RootLayout>
            <div className="mx-auto w-full max-w-3xl p-6">
                <BackButton className="-ml-2 mb-6" />

                <div className="rounded-lg border border-gray-200 bg-white p-6">
                    <h1 className="pb-6 text-3xl font-bold text-gray-800">Create a new skill</h1>

                    <EndorsementForm />
                </div>
            </div>
        </RootLayout>
    )
}
