import { Transition } from "@headlessui/react"

type Props = {
    show: boolean
    message: string
}

export const InputErrorMessage = ({ show, message }: Props) => {
    return (
        <Transition show={show}>
            <div className="text-sm text-red-500 transition duration-150 ease-in data-[closed]:-translate-y-1 data-[closed]:opacity-0">
                <p className="pt-1">{message}</p>
            </div>
        </Transition>
    )
}
