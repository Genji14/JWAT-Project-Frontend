import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { MessagesSquare } from 'lucide-react'
import CommentDialog from './CommentDialog'
const Comment = () => {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant={'ghost'} className="items-center gap-1.5">
                        <MessagesSquare className='w-4 h-4' />
                        <span>Comment</span>
                    </Button>
                </DialogTrigger>
                <DialogContent
                    styledCard={true}
                    className='p-6 lg:w-2/5'
                    onInteractOutside={(e) => {
                        e.preventDefault()
                    }}
                >
                    <CommentDialog />
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Comment
