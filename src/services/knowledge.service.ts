import { KNOWLEDGE_ENDPOINTS } from "@/lib/constants/EndPoints";
import { AxiosResponse } from "axios";
import { IKnowledge } from "@/types/interfaces/Knowledge";
import API_INSTANCE from "@/lib/api";

class KnowledgeService {

    getKnowledgeByProjectId = (projectId: number): Promise<AxiosResponse<IKnowledge[]>> => {
        return API_INSTANCE.get(KNOWLEDGE_ENDPOINTS.GET_KNOWLEDGE_BY_PROJECT(projectId));
    }

    createKnowledge = (form: FormData) => {
        return API_INSTANCE.post(KNOWLEDGE_ENDPOINTS.CREATE_KNOWLEDGE, form);
    }
}

export const knowledgeService = new KnowledgeService();