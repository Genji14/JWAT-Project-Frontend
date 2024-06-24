import { BLOG_ENDPOINTS } from '@/lib/constants/EndPoints'
import API_INSTANCE from '@/lib/api';

class BlogService {

    getBlogList = () => {
        return API_INSTANCE.get(BLOG_ENDPOINTS.GET_BLOG_LIST, {
            params: {
                limit: 8
            }
        });
    }

    createBlog = (form: FormData) => {
        return API_INSTANCE.post(BLOG_ENDPOINTS.CREATE_BLOG, form)
    }
}

export const blogService = new BlogService()
