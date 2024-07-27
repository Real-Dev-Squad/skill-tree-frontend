import Image from "next/image";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import clsx from 'clsx';
import React, { useState, FC, ChangeEvent } from 'react';

type OptionTypes = {
  id: number;
  skill: string;
};

type ComboboxProps = {
    options: OptionTypes[];
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    handleAddSkill: () => void;
}

const SkillCombobox: FC = ({placeholder, options,value, onChange, handleAddSkill}: ComboboxProps) => {
  const [query, setQuery] = useState('');

  const filteredSkills =
    query === ''
      ? options
      : options.filter((option) => {
          return  option?.skill?.toLowerCase().includes(query.toLowerCase())
        })

  return (
      <Combobox value={value} onChange={onChange} onClose={() => setQuery('')}>
        <div className="relative">
          <ComboboxInput
            className={clsx(
              'border rounded-lg border-blue bg-black/5 font-normal py-2.5 px-4 text-sm/6 h-11 w-64',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )}
            displayValue={(option) => option?.skill}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
          <Image className="max-lg:hidden" src="/downarrow.svg" alt="expand" height={10} width={10} />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            'w-[var(--input-width)] bg-white rounded-lg border border-gray mt-2 bg-white/5 [--anchor-gap:var(--spacing-1)] empty:invisible',
            'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 shadow-custom-1'
          )}
        >
          {filteredSkills?.length > 0 ? 
          
          filteredSkills?.map((option) => (
            <ComboboxOption
              key={option?.id}
              value={option}
              className="group flex items-center bg-white border-b border-lightgray gap-2 p-4 select-none cursor-pointer data-[focus]:bg-blue-200"
            >
              <span className="text-sm font-normal text-darkblueblack capitalize">{option?.skill}</span>
            </ComboboxOption>
          )) : <div
          className="group flex items-center bg-white border-b border-lightgray gap-2 p-4 select-none cursor-pointer hover:bg-blue-200"
        >
          <span onClick={handleAddSkill} className="flex items-center gap-2 text-sm font-medium text-gray-300 capitalize">
            <Image className="max-lg:hidden" src="/addicon.svg" alt="add skill icon" height={16} width={16} />
            Add new skill
          </span>
        </div>}
        </ComboboxOptions>
      </Combobox>
    
  )
}


export default SkillCombobox;