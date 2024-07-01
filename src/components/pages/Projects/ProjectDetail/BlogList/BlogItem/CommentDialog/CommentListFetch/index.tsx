import { useGetBlogComments } from '@/hooks/query/blog.query'
import { Loader2 } from 'lucide-react'
import React from 'react'
import CommentItem from '../CommentItem'

const CommentListFetch = ({ blogId }: { blogId: number }) => {
    const { commentsData, isFetchingComments } = useGetBlogComments(blogId)

    // useEffect(() => {
    //     if (commentsData) {
    //         setTotalComments(commentsData.length)
    //     }
    // }, [commentsData])
    return (
        <>
            {isFetchingComments ? (
                <Loader2 className='mx-auto h-8 w-8 animate-spin text-primary' />
            ) : (
                <>
                    {!!commentsData?.length && (
                        <div className='flex h-full w-full flex-col gap-4'>
                            {commentsData?.map((comment) => {
                                return (
                                    <CommentItem
                                        comment={comment}
                                        key={comment.id}
                                    />
                                )
                            })}
                        </div>
                    )}
                </>
            )}
        </>
    )
}

export default CommentListFetch
