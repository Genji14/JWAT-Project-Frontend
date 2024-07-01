import {
    DialogContent,
    DialogDescription,
    DialogHeader,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import CommentInput from './CommentInput'
import CommentListWhileACommnetSend from './CommentListSend'
import CommentListFetch from './CommentListFetch'

const CommentDialog = ({
    blogId,
    setTotalComments,
}: {
    blogId: number
    setTotalComments: React.Dispatch<React.SetStateAction<number>>
}) => {
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
            <ScrollArea className='h-[75vh] lg:h-[60vh]'>
                <div className='flex h-full w-full flex-col gap-4'>
                    <CommentListWhileACommnetSend blogId={blogId} setTotalComments={setTotalComments} />
                    <CommentListFetch blogId={blogId} setTotalComments={setTotalComments} />
                </div>
            </ScrollArea>

            <CommentInput blogId={blogId} />
        </DialogContent>
    )
}

export default CommentDialog
