import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from '@/components/ui/dialog'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useDeleteBlog } from '@/hooks/mutation/blog.mutation'
import { DialogDescription } from '@radix-ui/react-dialog'
import { Ellipsis, FileX, FolderCog, Loader2 } from 'lucide-react'
import { useState } from 'react'
import EditBlogForm from './EditBlogForm'

const BlogItemActionButton = ({ id }: { id: number }) => {
    const [open, setOpen] = useState<boolean>(false)

    const { mutateDeleteBlog, isPendingDeleteBlog } = useDeleteBlog()

    const deleteBlog = async (id: number) => {
        await mutateDeleteBlog(id)
        setOpen(false)
    }

    return (
        <div>
            {' '}
            <Popover>
                <PopoverTrigger asChild>
                    <Button className='rounded p-2' variant={'ghost'}>
                        <Ellipsis className='h-4 w-4' />
                    </Button>
                </PopoverTrigger>
                <PopoverContent align='start' className='w-30 mt-1 p-1'>
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className='flex cursor-pointer items-center gap-2 rounded px-3 py-1.5 text-sm font-semibold hover:bg-accent'>
                                <FolderCog className='h-4 w-4' />
                                <span className='text-xs'>Edit blog</span>
                            </div>
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
                                    Edit Blog
                                </h3>
                            </DialogHeader>
                            <Separator />
                            <ScrollArea className='max-h-[75vh] pr-4'>
                                <EditBlogForm />
                            </ScrollArea>
                        </DialogContent>
                    </Dialog>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <div className='flex cursor-pointer items-center gap-2 rounded px-3 py-1.5 text-sm font-semibold text-red-600 hover:bg-accent'>
                                <FileX className='h-4 w-4' />
                                <span className='text-xs'>Delete blog</span>
                            </div>
                        </DialogTrigger>
                        <DialogContent
                            styledCard={true}
                            className='p-6 lg:w-1/3'
                            onInteractOutside={(e) => {
                                e.preventDefault()
                            }}
                        >
                            <DialogHeader className='space-y-0'>
                                <h3 className='text-lg font-bold uppercase'>
                                    Delete Blog
                                </h3>
                                <DialogDescription>
                                    Please check sure before deleting the blog.
                                </DialogDescription>
                            </DialogHeader>
                            <div className='flex justify-end gap-4'>
                                <Button
                                    disabled={isPendingDeleteBlog}
                                    className='w-1/4'
                                    onClick={() => deleteBlog(id)}
                                >
                                    <span>Delete</span>
                                    {isPendingDeleteBlog && (
                                        <Loader2 className='ml-2 h-4 w-4 animate-spin' />
                                    )}
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default BlogItemActionButton