import {
    Combobox as BaseCombobox,
    ComboboxInput as BaseComboboxInput,
    ComboboxOption as BaseComboboxOption,
    ComboboxOptions as BaseComboboxOptions,
} from "@headlessui/react"

export type TComboBoxOption<T> = {
    value: T
    label: string
}

type ComboboxProps<T> = {
    label: string
    value: TComboBoxOption<T>
    onChange: (value: TComboBoxOption<T>) => void
    onInputChange?: (value: string) => void
    options: TComboBoxOption<T>[]
}

export const Combobox = <T,>({ label, value, options, onChange, onInputChange }: ComboboxProps<T>) => {
    return (
        <BaseCombobox value={value} onChange={onChange}>
            <BaseComboboxInput
                aria-label={label}
                displayValue={(option: TComboBoxOption<T>) => option?.label}
                onChange={(e) => onInputChange && onInputChange(e.currentTarget.value)}
            />

            <BaseComboboxOptions anchor="bottom" className="border empty:invisible">
                {options.map((option) => (
                    <BaseComboboxOption
                        key={String(option.value)}
                        value={option.value}
                        className="data-[focus]:bg-blue-100"
                    >
                        {option.label}
                    </BaseComboboxOption>
                ))}
            </BaseComboboxOptions>
        </BaseCombobox>
    )
}
