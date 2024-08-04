import { SignInWithRds } from "@/components/signin-with-rds"
import { ROUTES } from "@/routes"
import Link from "next/link"

const SignIn = () => {
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center">
            <SignInWithRds />
        </div>
    )
}

export default SignIn
