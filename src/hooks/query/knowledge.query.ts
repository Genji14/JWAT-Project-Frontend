import { KNOWLEDGE_QUERY_KEY } from "@/lib/constants/QueryKey";
import { knowledgeService } from "@/services/knowledge.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export const useGetKnowledgeByProjectId = () => {

    const { query } = useRouter();
    const projectId = query.id;

    const { data, isFetching } = useQuery({
        queryKey: [KNOWLEDGE_QUERY_KEY.GET_KNOWLEDGES_BY_PROJECT, projectId],
        queryFn: async ({ queryKey }) => {
            const [_key, projectId] = queryKey;
            const res = await knowledgeService.getKnowledgeByProjectId(Number(projectId));
            return res.data;
        },
        refetchOnWindowFocus: false,
        enabled: !!projectId,
    })

    return {
        knowledgeListData: data,
        isFetchingKnowledgeList: isFetching,
    }
}