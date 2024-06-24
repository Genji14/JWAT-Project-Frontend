import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SendHorizontal } from 'lucide-react'

const CommentDialog = () => {
    return (
        <div>
            Share Your Knowledge
            <div className=' mt-2 flex justify-between space-x-2'>
                <div className='flex-auto'>
                    <Input type='text' placeholder='Enter your comment!' />
                </div>
                <Button type='submit' variant={'outline'}>
                    <SendHorizontal />
                </Button>
            </div>
        </div>
    )
}

export default CommentDialog
