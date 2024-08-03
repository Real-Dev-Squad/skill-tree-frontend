import { RdsApi } from "@/api/rds"
import { Combobox, TComboBoxOption } from "@/components/combobox"
import { debounce } from "@/utils/debounce"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

export const RdsUsersCombobox = () => {
    const [search, setSearch] = useState("")
    const [option, setOption] = useState<TComboBoxOption<string> | null>(null)

    const { data, isLoading, isError } = useQuery({
        enabled: !!search.length,
        queryKey: ["RdsApi.getAllUsers", search],
        queryFn: () => RdsApi.getAllUsers({ search }),
    })

    const filteredOptions =
        data?.users.map<TComboBoxOption<string>>((user) => ({
            value: user.id,
            label: user.first_name + " " + user.last_name,
        })) ?? []

    return (
        <Combobox
            label="User"
            value={option}
            options={filteredOptions}
            onChange={(option) => setOption(option)}
            onInputChange={debounce((search) => setSearch(search))}
        />
    )
}
