import { Combobox, TComboBoxOption } from "@/components/combobox"
import { RootLayout } from "@/layouts/root-layout"
import { useState } from "react"
import { RdsUsersCombobox } from "./components/rds-users-combobox"

const users: TComboBoxOption<number>[] = [
    {
        value: 1,
        label: "John Doe",
    },
    {
        value: 2,
        label: "Jane Doe",
    },
    {
        value: 3,
        label: "John Smith",
    },
]

export const CreateEndorsement = () => {
    const [search, setSearch] = useState("")
    const [option, setOption] = useState(users[0])

    const filteredOptions = users.filter((option) => option.label.toLowerCase().includes(search.toLowerCase()))

    return (
        <RootLayout>
            <div className="mx-auto w-full max-w-3xl p-6">
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                    <h1 className="text-xl font-bold text-gray-800">Create Endorsement</h1>
                    {/* <Combobox
                        label="test"
                        value={option}
                        options={filteredOptions}
                        onChange={(value) => setOption(value)}
                        onInputChange={(value) => setSearch(value)}
                    /> */}
                    <RdsUsersCombobox />
                </div>
            </div>
        </RootLayout>
    )
}
