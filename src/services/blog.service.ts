import API_INSTANCE from '@/lib/api'
import { BLOG_ENDPOINTS } from '@/lib/constants/EndPoints'

class BlogService {
    getBlogList = (page: number) => {
        return API_INSTANCE.get(BLOG_ENDPOINTS.GET_BLOG_LIST, {
            params: {
                page: page,
            },
        })
    }

    createBlog = (form: FormData) => {
        return API_INSTANCE.post(BLOG_ENDPOINTS.CREATE_BLOG, form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    }

    getStarOfBlog = (id: number) => {
        return API_INSTANCE.get(BLOG_ENDPOINTS.GET_STAR_BLOG(id))
    }

    getCommentOfBlog = (id: number) => {
        return API_INSTANCE.get(BLOG_ENDPOINTS.GET_COMMENT_BLOG(id))
    }

    getHashTagOfBlog = (id: number) => {
        return API_INSTANCE.get(BLOG_ENDPOINTS.GET_HASHTAG_BLOG(id))
    }

    getMediaOfBlog = (id: number) => {
        return API_INSTANCE.get(BLOG_ENDPOINTS.GET_MEDIA_BLOG(id))
    }

    searchBlog = (text: string) => {
        return API_INSTANCE.get(BLOG_ENDPOINTS.SEARCH_BLOG, {
            params: {
                text,
            },
        })
    }

    updateBlog = (id: number, form: FormData) => {
        return API_INSTANCE.patch(BLOG_ENDPOINTS.UPDATE_BLOG(id), form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    }

    deleteBlog = (id: number) => {
        return API_INSTANCE.delete(BLOG_ENDPOINTS.DELETE_BLOG(id))
    }
}

export const blogService = new BlogService()
