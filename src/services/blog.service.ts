import { BLOG_ENDPOINTS } from '@/lib/constants/EndPoints'
import { AppService } from './app.service'

class BlogService extends AppService {
    constructor() {
        super()
    }

    createBlog = (form: FormData) => {
        return this.post(BLOG_ENDPOINTS.CREATE_BLOG, form)
    }
}

export const blogService = new BlogService()
