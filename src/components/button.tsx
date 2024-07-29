import { forwardRef } from "react"
import React from "react"

import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2Icon } from "lucide-react"

import { cn } from "@/utils/classname"

const buttonVariants = cva(
    [
        "flex items-center gap-2 justify-center rounded-md text-sm font-medium transition text-gray-900",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "focus-visible:ring-offset-2 focus-visible:ring-blue-400",
        "disabled:pointer-events-none",
        "[&>svg]:w-4 [&>svg]:h-4",
    ],
    {
        variants: {
            variant: {
                primary: [
                    "bg-blue-600 text-gray-50",
                    "hover:bg-blue-700 active:bg-blue-800 ",
                    "disabled:bg-gray-300 disabled:text-gray-500 data-[disabled]:bg-gray-300 data-[disabled]:text-gray-500",
                ],
                secondary: [
                    "bg-blue-50 text-blue-600",
                    "hover:bg-blue-100 active:bg-blue-200 active:text-blue-800",
                    "disabled:bg-gray-100 disabled:text-gray-600 data-[disabled]:bg-gray-100 data-[disabled]:text-gray-600",
                ],
                outline: [
                    "border border-gray-300 text-gray-900",
                    "hover:bg-gray-100 active:bg-gray-200",
                    "disabled:bg-gray-100 disabled:text-gray-500 data-[disabled]:bg-gray-100 data-[disabled]:text-gray-500",
                ],
                danger: [
                    "bg-red-500 text-gray-50",
                    "hover:bg-red-600 active:bg-red-700 focus-visible:ring-red-400",
                    "disabled:opacity-50 data-[disabled]:opacity-50",
                ],
                ghost: [
                    "text-gray-900",
                    "hover:bg-gray-100 active:bg-gray-200",
                    "disabled:opacity-80 data-[disabled]:opacity-80",
                ],
                link: ["hover:underline underline-offset-4", "disabled:opacity-80 data-[disabled]:opacity-80"],
            },
            size: {
                xs: "h-7 px-3",
                default: "h-10 px-4",
                sm: "h-8 rounded-md px-3 font-sm lg:h-9",
                lg: "h-11 rounded-md px-8 text-base [&>svg]:w-5 [&>svg]:h-5",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "default",
        },
    }
)

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean
        loading?: boolean
    }

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size, asChild = false, loading, disabled, children, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"

        return (
            <Comp
                ref={ref}
                data-loading={loading}
                disabled={loading || disabled}
                className={cn(buttonVariants({ variant, size }), className)}
                {...props}
            >
                {asChild ? (
                    React.isValidElement(children) ? (
                        React.cloneElement(
                            children,
                            undefined,
                            loading && <Loader2Icon className="animate-spin" />,
                            children.props.children
                        )
                    ) : null
                ) : (
                    <>
                        {loading && <Loader2Icon className="animate-spin" />}
                        {children}
                    </>
                )}
            </Comp>
        )
    }
)

Button.displayName = "Button"

export { Button, buttonVariants }
