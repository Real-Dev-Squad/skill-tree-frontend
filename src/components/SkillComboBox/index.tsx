import React, { useState, Fragment } from "react"

import { Combobox, Transition } from "@headlessui/react"
import Image from "next/image"

type OptionTypes = {
    id: number
    skill: string
}

type ComboboxProps = {
    placeholder: string
    options: OptionTypes[]
    onChange?: (value: OptionTypes) => void
    value?: OptionTypes
    handleAddSkill?: () => void
}

const SkillCombobox = ({ placeholder, options, onChange, value, handleAddSkill }: ComboboxProps) => {
    const [query, setQuery] = useState<string>("")

    const filteredSkills = !query
        ? options
        : options.filter((option) => option?.skill?.toLowerCase().includes(query.toLowerCase()))

    return (
        <Combobox value={value} onChange={onChange}>
            <div className="relative">
                <Combobox.Input
                    className="border-blue h-11 w-64 rounded-lg border bg-black/5 px-4 py-2.5 text-sm/6 font-normal focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                    displayValue={(option: OptionTypes) => option?.skill}
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
                        {filteredSkills?.length === 0 && query !== "" ? (
                            <div className="border-lightgray group flex cursor-pointer select-none items-center gap-2 border-b bg-white p-4 hover:bg-blue-200">
                                <span
                                    onClick={handleAddSkill}
                                    className="flex items-center gap-2 text-sm font-medium capitalize text-gray-300"
                                >
                                    <Image src="/addicon.svg" alt="add skill icon" height={16} width={16} />
                                    Add New Skill
                                </span>
                            </div>
                        ) : (
                            filteredSkills?.map((option) => (
                                <Combobox.Option
                                    key={option?.id}
                                    value={option}
                                    className="border-lightgray group flex cursor-pointer select-none items-center gap-2 border border-b bg-white p-4 hover:bg-blue-200"
                                >
                                    <span className="text-darkblueblack text-sm font-normal capitalize">
                                        {option?.skill}
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

export default SkillCombobox
