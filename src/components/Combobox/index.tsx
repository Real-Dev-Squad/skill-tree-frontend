import Image from "next/image";
import { Combobox, Transition } from '@headlessui/react';
import React, { useState, Fragment } from 'react';

type OptionTypes = {
  id: number;
  name: string;
};

type ComboboxProps = {
    options: OptionTypes[];
    value?: OptionTypes;
    onChange?: (value: OptionTypes) => void;
    placeholder?: string;
}

const ComboboxDropdown = ({options, value, onChange, placeholder}: ComboboxProps) => {
  const [query, setQuery] = useState('');

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) => {
          return option?.name?.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox value={value} onChange={onChange}>
      <div className="relative">
          <Combobox.Input
            className="border rounded-lg border-blue bg-black/5 font-normal py-2.5 px-4 text-sm/6 h-11 w-64 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
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
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options className="absolute mt-1 rounded-lg border border-gray bg-white/5 [--anchor-gap:var(--spacing-1)] empty:invisible max-h-60 w-full overflow-auto bg-white shadow-custom-1">
            {filteredOptions?.length === 0 && query !== '' ? (
             <div
             className="group flex items-center bg-white border-b border-lightgray gap-2 p-4 select-none cursor-pointer hover:bg-blue-200"
           >
             <span className="flex items-center text-sm font-medium text-gray-300 capitalize">
               
               No Results
             </span>
           </div>
            ) : (
              filteredOptions?.map((option) => (
                <Combobox.Option
                  key={option?.id}
                  value={option}
                  className="group flex items-center bg-white border border-b border-lightgray gap-2 p-4 select-none cursor-pointer hover:bg-blue-200"
                >
                      <span
                      className="text-sm font-normal text-darkblueblack capitalize"
                      >
                        {option?.name}
                      </span>
                      
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}

export default ComboboxDropdown;
