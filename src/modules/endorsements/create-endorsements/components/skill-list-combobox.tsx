import { useQuery } from "@tanstack/react-query"

import { SkillsApi } from "@/api/skills"
import { Combobox, TComboBoxOption } from "@/components/combobox"
import { Shimmer } from "@/components/shimmer"

type TOption = TComboBoxOption<number>

const SkillListShimmer = () => {
    return (
        <div>
            <Shimmer className="mb-2 h-7 w-16" />
            <Shimmer className="h-10" />
        </div>
    )
}

type Props = {
    value?: number
    label?: string
    placeholder?: string
    errorMessage?: string
    onChange: (id?: number) => void
}

export const SkillListCombobox = ({ label, value, placeholder, errorMessage, onChange }: Props) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["SkillsApi.getAllSkills"],
        queryFn: SkillsApi.getAllSkills,
    })

    const options =
        data?.map<TOption>((skill) => ({
            value: skill.id,
            label: skill.name,
        })) ?? []

    const selectedOption = options.find((option) => option.value === value) ?? null

    if (isLoading) {
        return <SkillListShimmer />
    }

    if (isError) {
        return null
    }

    return (
        <Combobox
            immediate
            label={label}
            options={options}
            value={selectedOption}
            placeholder={placeholder}
            errorMessage={errorMessage}
            onChange={(option) => onChange(option?.value)}
        />
    )
}
