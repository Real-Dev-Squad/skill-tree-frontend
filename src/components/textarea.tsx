import { Textarea as BaseTextArea, Field } from "@headlessui/react"

import { cn } from "@/utils/classname"

import { InputErrorMessage } from "./input-error-message"
import { Label } from "./label"

type Props = {
    rows?: number
    label?: string
    value?: string
    className?: string
    placeholder?: string
    errorMessage?: string
    onChange?: (value: string) => void
}

export const Textarea = ({ label, value, rows = 5, errorMessage, className, placeholder, onChange }: Props) => {
    return (
        <Field>
            {label && <Label>{label}</Label>}
            <BaseTextArea
                value={value}
                rows={rows}
                placeholder={placeholder}
                onChange={(e) => onChange && onChange(e.currentTarget.value)}
                className={cn(
                    "w-full rounded-lg border border-gray-200 p-4 outline-none ring ring-transparent transition focus:border-blue-400 focus:ring-blue-100",
                    className
                )}
            />

            <InputErrorMessage show={!!errorMessage?.length} message={errorMessage ?? ""} />
        </Field>
    )
}
