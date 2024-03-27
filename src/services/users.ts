import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { RDS_BACKEND_URL } from "@/constants/urls";

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

export const useLogoutUserMutation = () =>
    useMutation({
        mutationKey: ["users.logoutUser"],
        mutationFn: () =>
            axios
                .get(`${RDS_BACKEND_URL}/auth/signout`, {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                })
                .then((res) => res.data),
        onError(err) {
            return err;
        },
    });
