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
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { PencilLineIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import AddBlogForm from './AddBlogForm'
import { useStore } from '@/components/providers/StoreProvider'
import { useQueryClient } from '@tanstack/react-query'
import { BLOG_QUERY_KEY } from '@/lib/constants/QueryKey'


const AddBlogDialog = () => {

    const queryClient = useQueryClient();
    const [open, setOpen] = useState<boolean>(false);
    const socket = useStore((state) => state.socket);
    const clientId = useRef(
        'unique-client-id-' + Math.random().toString(36).substring(2, 9)
    )

    useEffect(() => {
        if (socket) {
            socket.emit('register', { clientId: clientId.current })
            socket.on('uploadSuccess', (blogId: number) => {
                queryClient.invalidateQueries({
                    queryKey: [BLOG_QUERY_KEY.GET_BLOG_ITEM, blogId]
                })
            })

            return () => {
                socket.off('uploadSuccess')
            }
        }

    }, [socket])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <TooltipProvider>
                <Tooltip>
                    <DialogTrigger asChild>
                        <TooltipTrigger asChild>
                            <Button variant={'ghost'} className='p-2'>
                                <PencilLineIcon className='h-5 w-5' />
                            </Button>
                        </TooltipTrigger>
                    </DialogTrigger>
                    <TooltipContent side='bottom'>
                        <p>Add New Blog</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <DialogContent
                styledCard={true}
                className='p-6 lg:w-2/5'
                onInteractOutside={(e) => {
                    e.preventDefault()
                }}
            >
                <DialogHeader className='space-y-0'>
                    <h3 className='text-xl font-bold uppercase'>
                        Add New Blog
                    </h3>
                    <DialogDescription>
                        You can share knowledge or raise issues with new.
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <ScrollArea className='max-h-[75vh] pr-4'>
                    <AddBlogForm
                        setOpen={setOpen}
                        clientId={clientId.current}
                    />
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

export default AddBlogDialog
