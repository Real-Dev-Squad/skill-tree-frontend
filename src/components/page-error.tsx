import { useRouter } from "next/navigation"
import { Button } from "./button"
import { RotateCw } from "lucide-react"

export const PageError = () => {
    const reload = () => {
        window.location.reload()
    }

    return (
        <div className="flex flex-1 flex-col items-center justify-center">
            <h4 className="pb-2">Something went wrong please</h4>

            <Button size="sm" variant="secondary" onClick={reload}>
                <RotateCw />
                Reload page
            </Button>
        </div>
    )
}
