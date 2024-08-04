import { Input as BaseInput, Field } from "@headlessui/react"
import { cn } from "@/utils/classname"
import { HTMLInputTypeAttribute } from "react"
import { InputErrorMessage } from "./input-error-message"
import { Label } from "./label"

type Props = {
    value?: string
    name?: string
    label?: string
    disabled?: boolean
    className?: string
    placeholder?: string
    errorMessage?: string
    type?: HTMLInputTypeAttribute
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

/**
 * TODO - @yesyash : Create a common label component
 * ---
 */
export const Input = ({
    value,
    name,
    disabled,
    label,
    type = "text",
    placeholder,
    className,
    errorMessage,
    onChange,
}: Props) => {
    return (
        <Field disabled={disabled}>
            {label && <Label>{label}</Label>}

            <BaseInput
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                className={cn(
                    "h-10 w-full rounded-lg border border-gray-200 px-4 outline-none ring ring-transparent transition focus:border-blue-400 focus:ring-blue-100",
                    className
                )}
                placeholder={placeholder}
            />

            <InputErrorMessage show={!!errorMessage?.length} message={errorMessage ?? ""} />
        </Field>
    )
}
