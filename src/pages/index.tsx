import Link from "next/link"

import { ROUTES } from "@/routes"

const Homepage = () => {
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center">
            <h1 className="pb-1 text-4xl font-bold">Welcome to Skilltree</h1>
            <p className="text-sm text-gray-500">
                Visit{" "}
                <Link className="text-blue-500 hover:text-blue-600 hover:underline" href={ROUTES.requests}>
                    /requests
                </Link>{" "}
                to view all pending skill requests
            </p>
        </div>
    )
}

export default Homepage
