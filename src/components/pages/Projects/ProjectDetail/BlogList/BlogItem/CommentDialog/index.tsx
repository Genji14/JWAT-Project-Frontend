import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useGetBlogComments } from '@/hooks/query/blog.query'
import { Loader2, MessagesSquare } from 'lucide-react'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import CommentInput from './CommentInput'
import CommentItem from './CommentItem'

const socket = io('http://localhost:3001')

const CommentDialog = ({
    blogId,
    setTotalComments,
}: {
    blogId: number
    setTotalComments: React.Dispatch<React.SetStateAction<number>>
}) => {
    const { commentsData, isFetchingComments } = useGetBlogComments(blogId)
    const [commentList, setCommentList] = useState<any[]>([])
    const [open, setOpen] = useState(false)
    useEffect(() => {
        if (commentsData) {
            setTotalComments(commentsData.length)
            setCommentList(commentsData)
        }
    }, [commentsData])

    useEffect(() => {
        const blogIdString = blogId.toString() + 'socket'
        if (open) {
            socket.emit('joinBlog', { blogId: blogIdString })
            socket.on('receiveComment', (comment) => {
                console.log(comment)
                if (blogId === comment.blog.id) {
                    setCommentList((prev) => [...prev, comment])
                }
            })
        }
        return () => {
            socket.off('receiveComment')
        }
    }, [open])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={'ghost'} className='items-center gap-1.5'>
                    <MessagesSquare className='h-4 w-4' />
                    <span>Comments</span>
                </Button>
            </DialogTrigger>
            <DialogContent
                styledCard={true}
                className='p-6 lg:w-2/5'
                onInteractOutside={(e) => {
                    e.preventDefault()
                }}
            >
                <DialogHeader className='space-y-0'>
                    <h3 className='text-xl font-bold uppercase'>
                        Blog Comments
                    </h3>
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
                            {!commentList?.length ? (
                                <div className='flex items-center justify-center'>
                                    <span>
                                        Let&apos;s send the first comment in
                                        this blog
                                    </span>
                                </div>
                            ) : (
                                <ScrollArea className='h-[75vh] lg:h-[60vh]'>
                                    <div className='flex h-full w-full flex-col gap-4'>
                                        {commentList?.map((comment) => {
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
        </Dialog>
    )
}

export default CommentDialog
