import { useStore } from '@/components/providers/StoreProvider'
import { PROJECT_QUERY_KEY, USER_QUERY_KEY } from '@/lib/constants/QueryKey'
import { projectService } from '@/services/ProjectService'
import { userService } from '@/services/UserService'
import { useQuery } from '@tanstack/react-query'

export const useCurrentUserInfo = () => {
    const setRole = useStore((state) => state.setRole)

    const { data, isFetching } = useQuery({
        queryKey: [USER_QUERY_KEY.CURRENT],
        queryFn: async () => {
            const res = await userService.current()
            setRole(res.data.role)
            return res.data
        },
        staleTime: 0,
        refetchOnWindowFocus: false,
    })

    return {
        currentUserInfoData: data,
        isFetchingCurrentUserInfo: isFetching,
    }
}

export const useSearchProject = (name?: string) => {
    const { data, isFetching } = useQuery({
        queryKey: [PROJECT_QUERY_KEY.SEARCH, name],
        queryFn: async ({ queryKey }) => {
            const [_key, name] = queryKey;
            if (name) {
                const res = await projectService.searchProjects(name);
                return res.data;
            }
            const res = await projectService.getProjectsByEmployee();
            return res.data;
        },
        refetchOnWindowFocus: false,
    })

    return {
        projectListData: data,
        isFetchingProjectList: isFetching,
    }
}