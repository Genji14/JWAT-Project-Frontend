import { KNOWLEDGE_ENDPOINTS } from "@/lib/constants/EndPoints";
import { AppService } from "./app.service";
import { AxiosResponse } from "axios";
import { IKnowledge } from "@/types/interfaces/Knowledge";

class KnowledgeService extends AppService {
    constructor() {
        super();
    }

    getKnowledgeByProjectId = (projectId: number): Promise<AxiosResponse<IKnowledge[]>> => {
        return this.get(KNOWLEDGE_ENDPOINTS.GET_KNOWLEDGE_BY_PROJECT(projectId));
    }

    createKnowledge = (form: FormData) => {
        return this.post(KNOWLEDGE_ENDPOINTS.CREATE_KNOWLEDGE, form);
    }
}

export const knowledgeService = new KnowledgeService();