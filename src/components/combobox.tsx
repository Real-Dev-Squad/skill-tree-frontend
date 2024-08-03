import { cn } from "@/utils/classname"
import { inter } from "@/utils/fonts"
import {
    Combobox as BaseCombobox,
    ComboboxInput as BaseComboboxInput,
    ComboboxOption as BaseComboboxOption,
    ComboboxOptions as BaseComboboxOptions,
    Field,
    Label,
} from "@headlessui/react"

export type TComboBoxOption<T> = {
    value: T
    label: string
}

type ComboboxProps<T> = {
    label: string
    value: TComboBoxOption<T> | null
    onChange: (value: TComboBoxOption<T>) => void
    onInputChange?: (value: string) => void
    options: TComboBoxOption<T>[]
}

export const Combobox = <T,>({ label, value, options, onChange, onInputChange }: ComboboxProps<T>) => {
    return (
        <Field>
            {label && <Label>{label}</Label>}

            <BaseCombobox value={value} onChange={onChange}>
                <BaseComboboxInput
                    aria-label={label}
                    className="h-10 w-full rounded-lg border border-gray-200 px-4 outline-none ring ring-transparent transition focus:border-blue-400 focus:ring-blue-100"
                    displayValue={(option: TComboBoxOption<T>) => option?.label}
                    onChange={(e) => onInputChange && onInputChange(e.currentTarget.value)}
                />

                <BaseComboboxOptions
                    anchor={{ to: "bottom start", gap: "8px" }}
                    className={cn(
                        "w-[var(--input-width)] rounded-lg border bg-white font-sans [--anchor-padding:8px] empty:invisible",
                        inter.variable
                    )}
                >
                    {options.map((option) => (
                        <BaseComboboxOption
                            key={String(option.value)}
                            value={option}
                            className="px-4 py-2 data-[focus]:bg-blue-100"
                        >
                            {option.label}
                        </BaseComboboxOption>
                    ))}
                </BaseComboboxOptions>
            </BaseCombobox>
        </Field>
    )
}
