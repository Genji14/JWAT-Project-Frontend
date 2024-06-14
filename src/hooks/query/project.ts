import { PROJECT_QUERY_KEY } from "@/lib/constants/QueryKey";
import { projectService } from "@/services/project.service";
import { useQuery } from "@tanstack/react-query";

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