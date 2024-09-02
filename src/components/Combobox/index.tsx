import React, { useState, Fragment } from "react"

import { Combobox, Transition } from "@headlessui/react"
import Image from "next/image"

type OptionTypes = {
    id: number
    name: string
}

type ComboboxProps = {
    options: OptionTypes[]
    value?: OptionTypes
    onChange?: (value: OptionTypes) => void
    placeholder?: string
}

const ComboboxDropdown = ({ options, value, onChange, placeholder }: ComboboxProps) => {
    const [query, setQuery] = useState("")

    const filteredOptions = !query
        ? options
        : options.filter((option) => option?.name?.toLowerCase().includes(query.toLowerCase()))

    return (
        <Combobox value={value} onChange={onChange}>
            <div className="relative">
                <Combobox.Input
                    className="border-blue h-11 w-64 rounded-lg border bg-black/5 px-4 py-2.5 text-sm/6 font-normal focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                    displayValue={(option: OptionTypes) => option?.name}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={placeholder}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <Image src="/downarrow.svg" alt="expand" height={10} width={10} />
                </Combobox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery("")}
                >
                    <Combobox.Options className="border-gray shadow-custom-1 absolute mt-1 max-h-60 w-full overflow-auto rounded-lg border bg-white bg-white/5 [--anchor-gap:var(--spacing-1)] empty:invisible">
                        {filteredOptions?.length === 0 && query !== "" ? (
                            <div className="border-lightgray group flex cursor-pointer select-none items-center gap-2 border-b bg-white p-4 hover:bg-blue-200">
                                <span className="flex items-center text-sm font-medium capitalize text-gray-300">
                                    No Results
                                </span>
                            </div>
                        ) : (
                            filteredOptions?.map((option) => (
                                <Combobox.Option
                                    key={option?.id}
                                    value={option}
                                    className="border-lightgray group flex cursor-pointer select-none items-center gap-2 border border-b bg-white p-4 hover:bg-blue-200"
                                >
                                    <span className="text-darkblueblack text-sm font-normal capitalize">
                                        {option?.name}
                                    </span>
                                </Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    )
}

export default ComboboxDropdown
