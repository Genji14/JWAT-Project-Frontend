import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Loader2, MessagesSquare } from 'lucide-react'
import { DialogDescription, DialogHeader } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { useGetBlogComments } from '@/hooks/query/blog.query'
import CommentItem from './CommentItem'
import { ScrollArea } from '@/components/ui/scroll-area'
import CommentInput from './CommentInput'
import { useEffect } from 'react'
import { useStore } from '@/components/providers/StoreProvider'
import { Comment } from '@/types'

const CommentDialog = ({
    blogId,
    setTotalComments,
}: {
    blogId: number
    setTotalComments: React.Dispatch<React.SetStateAction<number>>
}) => {
    const { commentsData, isFetchingComments } = useGetBlogComments(blogId)
    const socket = useStore((state) => state.socket)

    useEffect(() => {
        socket.on(`comment/${blogId}`, (data: Comment) => {
            console.log('Message receive!')
        })

        return () => {
            socket.off(`comment/${blogId}`)
        }
    }, [])

    useEffect(() => {
        if (commentsData) setTotalComments(commentsData.length)
    }, [commentsData])

    return (
        <DialogContent
            styledCard={true}
            className='p-6 lg:w-2/5'
            onInteractOutside={(e) => {
                e.preventDefault()
            }}
        >
            <DialogHeader className='space-y-0'>
                <h3 className='text-xl font-bold uppercase'>Blog Comments</h3>
                <DialogDescription>
                    Sharing your knowledge in this blog content.
                </DialogDescription>
            </DialogHeader>
            <Separator />
            <div className='flex h-full w-full flex-col gap-4'>
                {isFetchingComments ? (
                    <Loader2 className='mx-auto h-8 w-8 animate-spin text-primary' />
                ) : (
                    <>
                        {!commentsData?.length ? (
                            <div className='flex items-center justify-center'>
                                <span>
                                    Let&apos;s send the first comment in this
                                    blog
                                </span>
                            </div>
                        ) : (
                            <ScrollArea className='h-[75vh] lg:h-[60vh]'>
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
                            </ScrollArea>
                        )}
                    </>
                )}
            </div>

            <CommentInput blogId={blogId} />
        </DialogContent>
    )
}

export default CommentDialog
