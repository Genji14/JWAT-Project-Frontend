import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
import AddBlogForm from './AddBlogForm'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { PencilLineIcon } from 'lucide-react'

const AddBlogDialog = () => {
    const [open, setOpen] = useState<boolean>(false);

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
                    <h3 className='text-xl font-bold uppercase'>Add New Blog</h3>
                    <DialogDescription>
                        You can share knowledge or raise issues with new.
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <ScrollArea className="max-h-[75vh] pr-4">
                    <AddBlogForm setOpen={setOpen} />
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

export default AddBlogDialog
