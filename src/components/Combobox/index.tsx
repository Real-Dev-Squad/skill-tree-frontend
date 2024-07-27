import Image from "next/image";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import clsx from 'clsx';
import React, { useState, FC, ChangeEvent } from 'react';

type OptionTypes = {
  id: number;
  name: string;
};

type ComboboxProps = {
    options: OptionTypes[];
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const ComboboxDropdown: FC = ({placeholder, options,value, onChange}: ComboboxProps) => {
  const [query, setQuery] = useState('');

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) => {
          return  option?.name?.toLowerCase().includes(query.toLowerCase())
        })

  return (
      <Combobox value={value} onChange={onChange} onClose={() => setQuery('')}>
        <div className="relative">
          <ComboboxInput
            className={clsx(
              'border rounded-lg border-blue bg-black/5 font-normal py-2.5 px-4 text-sm/6 h-11 w-64',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )}
            displayValue={(option) => option?.name}
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
          {filteredOptions?.length > 0 ? 
          
          filteredOptions?.map((option) => (
            <ComboboxOption
              key={option?.id}
              value={option}
              className="group flex items-center bg-white border-b border-lightgray gap-2 p-4 select-none cursor-pointer data-[focus]:bg-blue-200"
            >
              <span className="text-sm font-normal text-darkblueblack capitalize">{option?.name}</span>
            </ComboboxOption>
          )) : <div
          className="group flex items-center bg-white border-b border-lightgray gap-2 p-4 select-none cursor-pointer hover:bg-blue-200"
        >
          <span className="text-sm font-medium text-gray-300 capitalize">
              no results
          </span>
        </div>}
        </ComboboxOptions>
      </Combobox>
    
  )
}


export default ComboboxDropdown;