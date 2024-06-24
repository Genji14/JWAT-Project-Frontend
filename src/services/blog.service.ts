import API_INSTANCE from '@/lib/api'
import { BLOG_ENDPOINTS } from '@/lib/constants/EndPoints'

class BlogService {
    getBlogList = () => {
        return API_INSTANCE.get(BLOG_ENDPOINTS.GET_BLOG_LIST, {})
    }

    createBlog = (form: FormData) => {
        return API_INSTANCE.post(BLOG_ENDPOINTS.CREATE_BLOG, form)
    }
}

export const blogService = new BlogService()
