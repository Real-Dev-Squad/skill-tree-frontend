import { cn } from "@/utils/classname"
import { DetailedHTMLProps, InputHTMLAttributes } from "react"

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const Input = ({ className, ...props }: Props) => {
    return <input {...props} className={cn(className)} />
}
