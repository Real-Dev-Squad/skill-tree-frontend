import { useState } from "react"

import { useQuery } from "@tanstack/react-query"

import { RdsApi } from "@/api/rds"
import { Combobox, TComboBoxOption } from "@/components/combobox"
import { debounce } from "@/utils/debounce"

type Props = {
    value?: string
    label?: string
    placeholder?: string
    errorMessage?: string
    onChange: (value?: string) => void
}

export const RdsUsersCombobox = ({ value, label, errorMessage, placeholder, onChange }: Props) => {
    const [search, setSearch] = useState("")

    const { data } = useQuery({
        enabled: !!search.length,
        queryKey: ["RdsApi.getAllUsers", search],
        queryFn: () => RdsApi.getAllUsers({ search }),
    })

    const formattedOptions =
        data?.users.map<TComboBoxOption<string>>((user) => ({
            value: user.id.toString(),
            label: user.first_name + " " + user.last_name,
        })) ?? []

    const selectedOption = formattedOptions.find((option) => option.value === value) ?? null

    const debounceSearch = debounce((search: string) => setSearch(search), 200)

    return (
        <Combobox
            label={label}
            value={selectedOption}
            placeholder={placeholder}
            options={formattedOptions}
            errorMessage={errorMessage}
            onChange={(value) => onChange(value?.value)}
            onInputChange={(search) => debounceSearch(search)}
        />
    )
}
