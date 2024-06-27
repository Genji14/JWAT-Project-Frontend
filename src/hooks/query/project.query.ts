import { PROJECT_QUERY_KEY } from '@/lib/constants/QueryKey'
import { projectService } from '@/services/project.service'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

export const useGetProjectDetail = (id: number) => {
    const { data, isFetching } = useQuery({
        queryKey: [PROJECT_QUERY_KEY.FIND_ONE, id],
        queryFn: async ({ queryKey }) => {
            const [_key, id] = queryKey
            const res = await projectService.findOne(Number(id))
            return res.data
        },
        refetchOnWindowFocus: false,
        enabled: !!id,
    })

    return {
        projectDetailData: data,
        isFetchingProjectDetail: isFetching,
    }
}

export const useSearchUserNotInProject = (userId: string, page: number = 1) => {
    const { query } = useRouter()
    const { data, isFetching } = useQuery({
        queryKey: [PROJECT_QUERY_KEY.SEARCH_USER_NOT_IN_PROJECT, page, userId],
        queryFn: async ({ queryKey }) => {
            const [_key, page, userId] = queryKey
            const res = await projectService.searchUserNotInProject({
                id: Number(query.id),
                userId: userId.toString(),
                page: Number(page),
                limit: 5,
            })
            if (userId !== '')
                res.data = {
                    items: res.data,
                    meta: {
                        currentPage: 1,
                        itemCount: 1,
                        itemsPerPage: 1,
                        totalItems: 1,
                        totalPages: 1,
                    },
                }

            return res.data
        },
        refetchOnWindowFocus: false,
    })

    return {
        userData: data,
        isFetchingUser: isFetching,
    }
}

export const useGetDocument = () => {
    const { query } = useRouter()
    const projectId = Number(query.id)

    const { data, isFetching } = useQuery({
        queryKey: [PROJECT_QUERY_KEY.GET_PROJECT_ROOT_DOCUMENT, projectId],
        queryFn: async ({ queryKey }) => {
            const [_key, projectId] = queryKey
            const res = await projectService.getRootDocument(Number(projectId))
            return res.data
        },
        refetchOnWindowFocus: false,
    })

    return {
        documentData: data,
        isFetchingDocument: isFetching,
    }
}

export const useSearchDocument = (keyword: string) => {
    const { query } = useRouter()
    const { data, isFetching } = useQuery({
        queryKey: [PROJECT_QUERY_KEY.SEARCH_DOCUMENT, keyword],
        queryFn: async ({ queryKey }) => {
            const [_key, keyword] = queryKey
            const res = await projectService.searchDocument(Number(query.id), {
                name: keyword,
            })
            return res.data
        },
        enabled: !!keyword,
        refetchOnWindowFocus: false,
    })

    return {
        documentData: data,
        isFetchingDocument: isFetching,
    }
}

export const useSearchUsersInProject = () => {
    const { query } = useRouter()
    const { data, isFetching } = useQuery({
        queryKey: [PROJECT_QUERY_KEY.SEARCH_USERS_IN_PROJECT, Number(query.id)],
        queryFn: async ({ queryKey }) => {
            const [_key] = queryKey
            const res = await projectService.searchUsersInProject(
                Number(query.id)
            )

            return res.data
        },
        refetchOnWindowFocus: false,
    })

    return {
        usersData: data,
        isFetchingUsers: isFetching,
    }
}
