import { Label as BaseLabel } from "@headlessui/react"

import { cn } from "@/utils/classname"

type Props = {
    className?: string
    children: React.ReactNode
}

export const Label = ({ className, children }: Props) => {
    return <BaseLabel className={cn("block pb-2 text-sm font-medium text-gray-600", className)}>{children}</BaseLabel>
}
