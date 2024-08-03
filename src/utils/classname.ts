import { twMerge } from "tailwind-merge"

export const cn = (...classNames: (string | boolean | undefined)[]) => {
    return twMerge(classNames.filter(Boolean).join(" "))
}
