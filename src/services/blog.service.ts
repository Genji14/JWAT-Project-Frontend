import API_INSTANCE from '@/lib/api'
import { BLOG_ENDPOINTS } from '@/lib/constants/EndPoints'
import { Comment } from '@/types'
import { ICreateCommentForm } from '@/types/interfaces/Form'
import { AxiosResponse } from 'axios'

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

    getCommentOfBlog = (id: number): Promise<AxiosResponse<Comment[]>> => {
        return API_INSTANCE.get(BLOG_ENDPOINTS.GET_COMMENT_BLOG(id))
    }

    getHashTagOfBlog = (id: number) => {
        return API_INSTANCE.get(BLOG_ENDPOINTS.GET_HASHTAG_BLOG(id))
    }

    getMediaOfBlog = (id: number) => {
        return API_INSTANCE.get(BLOG_ENDPOINTS.GET_MEDIA_BLOG(id))
    }

    createComment = (form: ICreateCommentForm) => {
        return API_INSTANCE.post(BLOG_ENDPOINTS.CREATE_COMMENT, form)
    }

    searchBlog = (text: string) => {
        return API_INSTANCE.get(BLOG_ENDPOINTS.SEARCH_BLOG, {
            params: {
                text,
            },
        })
    }

    deleteBlog = (id: number) => {
        return API_INSTANCE.delete(BLOG_ENDPOINTS.DELETE_BLOG(id))
    }
}

export const blogService = new BlogService()
