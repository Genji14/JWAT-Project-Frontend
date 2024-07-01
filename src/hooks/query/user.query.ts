import { USER_QUERY_KEY } from "@/lib/constants/QueryKey";
import { userService } from "@/services/user.service";
import { CommonParams } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useFindUserById = (id: number) => {
    const { data, isFetching } = useQuery({
        queryKey: [USER_QUERY_KEY.FIND_ONE, id],
        queryFn: async ({ queryKey }) => {
            const [_key, id] = queryKey;
            const res = await userService.findOne(Number(id));
            return res.data;
        },
        refetchOnWindowFocus: false,
        enabled: !!id,
    })

    return {
        userInfoData: data,
        isFetchingUserInfo: isFetching,
    }
}

export const useGetUserManagementData = (params: CommonParams) => {
    const { data, isFetching } = useQuery({
        queryKey: [USER_QUERY_KEY.GET_ALL_WITH_PAGINATION, params],
        queryFn: async ({ queryKey }) => {
            const [_key, params] = queryKey;
            const res = await userService.getAllUsersWithPag(params as CommonParams);
            return res.data;
        },
        refetchOnWindowFocus: false
    })

    return {
        usersPaginationData: data,
        isFetching
    }
}