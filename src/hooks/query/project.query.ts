import { PROJECT_QUERY_KEY } from "@/lib/constants/QueryKey";
import { projectService } from "@/services/project.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export const useGetProjectDetail = (id: number) => {
    const { data, isFetching } = useQuery({
        queryKey: [PROJECT_QUERY_KEY.FIND_ONE, id],
        queryFn: async ({ queryKey }) => {
            const [_key, id] = queryKey;
            const res = await projectService.findOne(Number(id));
            return res.data;
        },
        refetchOnWindowFocus: false,
        enabled: !!id,
    })

    return {
        projectDetailData: data,
        isFetchingProjectDetail: isFetching,
    }
}

export const useSearchUserNotInProject = (userId: string) => {
    const { query } = useRouter();
    const { data, isFetching } = useQuery({
        queryKey: [PROJECT_QUERY_KEY.SEARCH_USER_NOT_IN_PROJECT, userId],
        queryFn: async ({ queryKey }) => {
            const [_key, userId] = queryKey;
            const res = await projectService.searchUserNotInProject({
                id: Number(query.id),
                userId: userId,
                page: 1,
                limit: 5
            });

            return userId ? res.data : res.data.items;
        },
        refetchOnWindowFocus: false
    })

    return {
        userData: data,
        isFetchingUser: isFetching
    }
}

export const useGetDocument = () => {
    const { query } = useRouter();
    const projectId = Number(query.id);

    const { data, isFetching } = useQuery({
        queryKey: [PROJECT_QUERY_KEY.SEARCH_USER_NOT_IN_PROJECT, projectId],
        queryFn: async ({ queryKey }) => {
            const [_key, projectId] = queryKey;
            const res = await projectService.getRootDocument(Number(projectId));
            return res.data;
        },
        refetchOnWindowFocus: false
    })

    return {
        documentData: data,
        isFetchingDocument: isFetching
    }
} 