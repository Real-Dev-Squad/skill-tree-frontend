import { useQuery, useMutation } from "@tanstack/react-query";
import { BASE_URL } from "@/constants/urls";
export const useGetEndorsements = () =>
    useQuery({
        queryKey: ["endorsements"],
        queryFn: () => fetch(`${BASE_URL}/endorsements`).then((res) => res.json()),
    });

export const usePostEndorsement = ({ endorsementData }) =>
    useMutation({
        mutationKey: ["endorsements"],
        mutationFn: () => fetch(`${BASE_URL}/endorsements`, endorsementData).then((res) => res.json()),
    });
