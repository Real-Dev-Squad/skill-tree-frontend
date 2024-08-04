import { ArrowLeft } from "lucide-react"
import { Button } from "./button"
import { useRouter } from "next/navigation"

type Props = {
    label?: string
    route?: string
    className?: string
}

export const BackButton = ({ label = "Back", route, className }: Props) => {
    const { push, back } = useRouter()

    const handleOnClick = () => {
        if (route) {
            push(route)
            return
        }

        back()
    }

    return (
        <Button size="xs" variant="ghost" className={className} onClick={handleOnClick}>
            <ArrowLeft className="text-blue-500" />
            {label}
        </Button>
    )
}
