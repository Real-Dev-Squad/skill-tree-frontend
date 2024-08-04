import { DetailedHTMLProps, FormHTMLAttributes } from "react"

type FormProps = DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>

export const Form = ({ children, ...props }: FormProps) => {
    return <form {...props}>{children}</form>
}
