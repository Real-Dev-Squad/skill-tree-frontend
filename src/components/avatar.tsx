import { cva, VariantProps } from "class-variance-authority"
import Image from "next/image"

import { cn } from "@/utils/classname"

const avatarVariants = cva(["rounded-full overflow-hidden bg-gray-100 text-gray-500 grid place-items-center"], {
    variants: {
        size: {
            sm: ["w-8 h-8 text-sm"],
            md: ["w-10 h-10 text-base"],
            lg: ["w-12 h-12 text-lg"],
        },
    },
    defaultVariants: {
        size: "md",
    },
})

type AvatarProps = VariantProps<typeof avatarVariants> & {
    src: string
    alt: string
    fallback?: string
    className?: string
}

export const Avatar = ({ src, alt, size, fallback, className }: AvatarProps) => {
    return (
        <div className={cn(avatarVariants({ size }), className)}>
            {src.length ? (
                <Image fill={true} src={src} alt={alt} />
            ) : (
                <span className="font-medium uppercase">{fallback}</span>
            )}
        </div>
    )
}
