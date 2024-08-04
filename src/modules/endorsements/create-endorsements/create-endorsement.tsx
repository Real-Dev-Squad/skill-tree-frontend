import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form } from "@/components/form"
import { Input } from "@/components/input"
import { RootLayout } from "@/layouts/root-layout"
import { z } from "zod"
import { RdsUsersCombobox } from "./components/rds-users-combobox"
import { SkillListCombobox } from "./components/skill-list-combobox"
import { Textarea } from "@/components/textarea"
import { Button } from "@/components/button"

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
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<TEndorsementFormSchema>({
        resolver: zodResolver(endorsementFormSchema),
    })

    const onSubmit = handleSubmit((data) => {
        console.log(data)
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

            <Button>Create Endorsement</Button>
        </Form>
    )
}

export const CreateEndorsement = () => {
    return (
        <RootLayout>
            <div className="mx-auto w-full max-w-3xl p-6">
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                    <h1 className="pb-6 text-3xl font-bold text-gray-800">Endorse a user</h1>

                    <EndorsementForm />
                </div>
            </div>
        </RootLayout>
    )
}
