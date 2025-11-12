import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {LoginSchema} from "../schemas/LoginSchema.ts";
import agent from "../api/agent.ts";
import {useLocation, useNavigate} from "react-router";
import {RegisterSchema} from "../schemas/RegisterSchema.ts";

export const useAccount = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const location = useLocation();
    const loginUser = useMutation({
        mutationFn: async (creds: LoginSchema) => {
            await agent.post('/login?useCookies=true', creds);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['user']
            })
        }
    })

    const registerUser = useMutation({
        mutationFn: async (creds: RegisterSchema) => {
            await agent.post('/account/register', creds)
        }
    })

    const logoutUser = useMutation({
        mutationFn: async () => {
            await agent.post('/account/logout')
        },
        onSuccess: () => {
            queryClient.removeQueries({queryKey: ['user']});
            queryClient.removeQueries({queryKey: ['activities']});
            navigate('/');
        }
    })

    const {data: currentUser, isLoading: loadingCurrentUser} = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await agent.get<User>('/account/user-info');
            return response.data;
        },
        enabled: !queryClient.getQueryData(['user']) && location.pathname !== '/login' && location.pathname !== '/register',
    })

    return {
        loginUser,
        currentUser,
        logoutUser,
        loadingCurrentUser,
        registerUser,
    }
}