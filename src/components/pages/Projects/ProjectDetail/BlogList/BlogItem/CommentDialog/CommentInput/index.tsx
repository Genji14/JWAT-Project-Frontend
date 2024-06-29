import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useCreateComment } from '@/hooks/mutation/blog.mutation'
import { Loader2Icon, MessageSquareShareIcon } from 'lucide-react'
import React, { useState } from 'react'

const CommentInput = ({ blogId }: { blogId: number }) => {
    const [content, setContent] = useState<string>('')
    const { mutateCreateComment, isPendingCreateComment } =
        useCreateComment(blogId)

    async function sendComment(content: string) {
        await mutateCreateComment({
            blogId: blogId,
            content: content,
        })
        setContent('')
    }

    return (
        <div className=' flex justify-between space-x-2'>
            <div className='flex-auto'>
                <Textarea
                    value={content}
                    onChange={(evt) => setContent(evt.target.value)}
                    placeholder='Enter your comment ...'
                    className='resize-none'
                />
            </div>
            <Button
                className='h-fit'
                disabled={!content || isPendingCreateComment}
                onClick={() => sendComment(content)}
            >
                <span>Send</span>
                {isPendingCreateComment ? (
                    <Loader2Icon className='ml-2 h-4 w-4 animate-spin' />
                ) : (
                    <MessageSquareShareIcon className='ml-2 h-4 w-4' />
                )}
            </Button>
        </div>
    )
}

export default CommentInput
