import { PROJECT_ENDPOINTS } from "@/lib/constants/EndPoints";
import { DOMAIN_NAME } from "@/lib/constants/SettingSystem";
import axios from "axios";

class ServerService {

    constructor() { }

    getProjectDetail = async (id: number) => {
        try {
            const res = await axios.get(DOMAIN_NAME + PROJECT_ENDPOINTS.FIND_ONE(id));
            return res.data;
        }
        catch (error) {
            console.error(error);
        }
        return null
    }
}

export const serverService = new ServerService();