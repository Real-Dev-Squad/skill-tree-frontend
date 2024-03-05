import { useQuery } from "@tanstack/react-query";
import { RDS_BACKEND_URL } from "@/constants/urls";
import { UserData } from "@/types/users";

export const useGetSelfUser = () =>
    useQuery({
        queryKey: ["users.getSelfUser"],
        queryFn: (): Promise<UserData> =>
            fetch(`${RDS_BACKEND_URL}/users/self`, {
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
                .then((res) => res.json())
                .catch((error) => error),
        onError(err) {
            return err;
        },
    });
