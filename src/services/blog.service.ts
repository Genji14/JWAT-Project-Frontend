import API_INSTANCE from '@/lib/api'
import { BLOG_ENDPOINTS } from '@/lib/constants/EndPoints'

class BlogService {
    getBlogList = (page: number) => {
        return API_INSTANCE.get(BLOG_ENDPOINTS.GET_BLOG_LIST, {
            params: {
                page: page
            }
        });
    }

    createBlog = (form: FormData) => {
        return API_INSTANCE.post(BLOG_ENDPOINTS.CREATE_BLOG, form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}

export const blogService = new BlogService()
