import { useQuery } from "@tanstack/react-query";
import { RDS_BACKEND_URL } from "@/constants/urls";
import axios from "axios";

export const useGetSelfUser = () =>
    useQuery({
        queryKey: ["users.getSelfUser"],
        queryFn: () =>
            axios
                .get(`${RDS_BACKEND_URL}/users/self`, {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                })
                .then((res) => res.data),
        onError(err) {
            return err;
        },
    });
