import { USER_QUERY_KEY } from "@/lib/constants/QueryKey"
import { userService } from "@/services/UserService"
import { useQuery } from "@tanstack/react-query"

export const useCurrentUserInfo = () => {
    const { data, isFetching } = useQuery({
        queryKey: [USER_QUERY_KEY.CURRENT],
        queryFn: async () => {
            const res = await userService.current();
            return res.data;
        },
        staleTime: 0,
        refetchOnWindowFocus: false
    })

    return {
        currentUserInfoData: data,
        isFetchingCurrentUserInfo: isFetching
    }
}