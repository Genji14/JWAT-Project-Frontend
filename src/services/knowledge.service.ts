import { KNOWLEDGE_ENDPOINTS } from "@/lib/constants/EndPoints";
import { AppService } from "./app.service";

class KnowledgeService extends AppService {
    constructor() {
        super();
    }

    addKnowledge = (form: FormData) => {
        return this.post(KNOWLEDGE_ENDPOINTS.CREATE_KNOWLEDGE, form);
    }
}

export const knowledgeService = new KnowledgeService();