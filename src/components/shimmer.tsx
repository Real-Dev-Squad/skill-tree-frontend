import { cn } from "@/utils/classname"

type Props = {
    className?: string
}

export const Shimmer = ({ className }: Props) => {
    return <div className={cn("h-11 w-full animate-pulse rounded-lg bg-gray-100", className)}></div>
}
