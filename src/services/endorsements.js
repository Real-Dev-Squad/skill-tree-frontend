import { useQuery, useMutation } from "@tanstack/react-query";
import { BASE_URL } from "@/constants/urls";
import axios from 'axios'
export const useGetEndorsements = () =>
    useQuery({
        queryKey: ["endorsements"],
        queryFn: () => axios.get(`${BASE_URL}/endorsements`).then((res) => res.json()),
    });

export const usePostEndorsement = ({ endorsementData }) =>
    useMutation({
        mutationKey: ["endorsements"],
        mutationFn: () => axios.post(`${BASE_URL}/endorsements`, endorsementData).then((res) => res.json()),
    });
