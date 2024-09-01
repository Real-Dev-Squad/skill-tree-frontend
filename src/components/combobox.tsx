import { useState } from "react"

import {
    Combobox as BaseCombobox,
    ComboboxInput as BaseComboboxInput,
    ComboboxOption as BaseComboboxOption,
    ComboboxOptions as BaseComboboxOptions,
    Field,
} from "@headlessui/react"
import { CheckIcon } from "lucide-react"

import { cn } from "@/utils/classname"
import { inter } from "@/utils/fonts"

import { InputErrorMessage } from "./input-error-message"
import { Label } from "./label"

export type TComboBoxOption<T> = {
    value: T
    label: string
}

type ComboboxProps<T> = {
    label?: string
    immediate?: boolean
    placeholder?: string
    errorMessage?: string
    value: TComboBoxOption<T> | null
    onChange: (value: TComboBoxOption<T> | null) => void
    onInputChange?: (value: string) => void
    options: TComboBoxOption<T>[]
}

/**
 * TODO - @yesyash : add a loading state
 * ---
 */
export const Combobox = <T,>({
    label,
    value,
    options,
    placeholder,
    immediate,
    onChange,
    onInputChange,
    errorMessage,
}: ComboboxProps<T>) => {
    const [query, setQuery] = useState<string>("")
    const filteredOptions = !query.length
        ? options
        : options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase()))

    const handleInputChange = (value: string) => {
        setQuery(value)
        onInputChange && onInputChange(value)
    }

    return (
        <Field>
            {label && <Label>{label}</Label>}

            <BaseCombobox value={value} onChange={onChange} immediate={immediate} onClose={() => setQuery("")}>
                <BaseComboboxInput
                    aria-label={label}
                    placeholder={placeholder}
                    className="h-10 w-full rounded-lg border border-gray-200 px-4 outline-none ring ring-transparent transition focus:border-blue-400 focus:ring-blue-100"
                    displayValue={(option: TComboBoxOption<T>) => option?.label}
                    onChange={(e) => handleInputChange(e.currentTarget.value)}
                />

                <BaseComboboxOptions
                    transition
                    anchor={{ to: "bottom start", gap: "8px" }}
                    className={cn(
                        "w-[var(--input-width)] rounded-lg border bg-white font-sans [--anchor-padding:8px] empty:invisible",
                        inter.variable
                    )}
                >
                    {filteredOptions.map((option) => (
                        <BaseComboboxOption
                            key={String(option.value)}
                            value={option}
                            className="group flex items-center gap-2 px-4 py-2 data-[focus]:bg-blue-100"
                        >
                            <CheckIcon className="invisible h-4 w-4 text-gray-500 group-data-[selected]:visible" />
                            {option.label}
                        </BaseComboboxOption>
                    ))}
                </BaseComboboxOptions>
            </BaseCombobox>

            <InputErrorMessage show={!!errorMessage?.length} message={errorMessage ?? ""} />
        </Field>
    )
}
