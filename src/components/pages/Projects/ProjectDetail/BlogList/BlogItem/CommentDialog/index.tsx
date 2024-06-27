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

const CommentDialog = ({ blogId, setTotalComments }: { blogId: number, setTotalComments: React.Dispatch<React.SetStateAction<number>> }) => {

    const { commentsData, isFetchingComments } = useGetBlogComments(blogId);

    useEffect(() => {
        if (commentsData)
            setTotalComments(commentsData.length);
    }, [commentsData])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'ghost'} className="items-center gap-1.5">
                    <MessagesSquare className='w-4 h-4' />
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
                    <h3 className='text-xl font-bold uppercase'>Blog Comments</h3>
                    <DialogDescription>
                        Sharing your knowledge in this blog content.
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <div className="flex flex-col gap-4 h-full w-full">

                    {
                        isFetchingComments ? <Loader2 className="animate-spin w-8 h-8 text-primary mx-auto" /> :
                            <>
                                {
                                    !commentsData?.length ?
                                        <div className="justify-center items-center flex">
                                            <span>Let's send the first comment in this blog</span>
                                        </div>
                                        : <ScrollArea className='h-[75vh] lg:h-[60vh]'>
                                            <div className="flex flex-col gap-4 h-full w-full">
                                                {
                                                    commentsData?.map((comment) => {
                                                        return <CommentItem comment={comment} key={comment.id} />
                                                    })
                                                }
                                            </div>
                                        </ScrollArea>
                                }
                            </>
                    }
                </div>

                <CommentInput blogId={blogId} />
            </DialogContent>
        </Dialog>
    )
}

export default CommentDialog
