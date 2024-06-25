import API_INSTANCE from "@/lib/api";
import { STAR_ENDPOINTS } from "@/lib/constants/EndPoints";

class StarService {
    createOrRemoveStar = (blogId: number) => {
        return API_INSTANCE.get(STAR_ENDPOINTS.CREATE_OR_REMOVE(blogId));
    }
}

export const starService = new StarService();