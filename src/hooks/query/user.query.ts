import { USER_QUERY_KEY } from "@/lib/constants/QueryKey";
import { userService } from "@/services/user.service";
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