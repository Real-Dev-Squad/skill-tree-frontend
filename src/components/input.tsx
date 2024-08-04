import { Input as BaseInput, Field, Label } from "@headlessui/react"
import { cn } from "@/utils/classname"
import { HTMLInputTypeAttribute } from "react"

type Props = {
    name?: string
    label?: string
    disabled?: boolean
    className?: string
    type?: HTMLInputTypeAttribute
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

/**
 * TODO - @yesyash : Create a common label component
 * ---
 */
export const Input = ({ name, disabled, label, type = "text", className, onChange }: Props) => {
    return (
        <Field disabled={disabled}>
            {label && <Label>{label}</Label>}
            <BaseInput name={name} type={type} className={cn(className)} onChange={onChange} />
        </Field>
    )
}
