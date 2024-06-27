import { Button } from '@/components/ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { useDeleteBlog } from '@/hooks/mutation/blog.mutation'
import { Ellipsis, FileX, FolderCog, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { HashTag, Media } from '@/types'
import { IBlog } from '@/types/interfaces/Blog'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

import EditBlogDialog from './EditBlogDialog'

const BlogItemActionButton = ({
    blog,
    hashTag,
    media,
}: {
    blog: IBlog
    hashTag: HashTag[]
    media: Media[]
}) => {
    const [open, setOpen] = useState<boolean>(false)
    const { id: currentUserId }: { id: number } = jwtDecode(
        Cookies.get('accessToken') ?? ''
    )
    const { mutateDeleteBlog, isPendingDeleteBlog } = useDeleteBlog()

    const deleteBlog = async (id: number) => {
        await mutateDeleteBlog(id)
        setOpen(false)
    }

    if (blog.user.id !== currentUserId) {
        return null
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className='rounded p-2' variant={'ghost'}>
                    <Ellipsis className='h-4 w-4' />
                </Button>
            </PopoverTrigger>
            <PopoverContent align='start' className='w-30 mt-1 p-1'>
                <EditBlogDialog blog={blog} media={media} hashTag={hashTag} />
                <AlertDialog open={open} onOpenChange={setOpen}>
                    <AlertDialogTrigger asChild>
                        <div className='flex cursor-pointer items-center gap-2 rounded px-3 py-1.5 text-sm font-semibold text-red-600 hover:bg-accent'>
                            <FileX className='h-4 w-4' />
                            <span className='text-xs'>Delete blog</span>
                        </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent
                        styledCard={true}
                        className='p-6 lg:max-w-lg'
                    >
                        <AlertDialogHeader className='space-y-0'>
                            <h3 className='text-lg font-bold uppercase'>
                                Delete Blog
                            </h3>
                            <AlertDialogDescription>
                                Please check sure before deleting the blog.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className='flex justify-end gap-2'>
                            <Button variant={"outline"} onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button variant={"destructive"} disabled={isPendingDeleteBlog} onClick={() => deleteBlog(blog.id)}>
                                <span>Delete</span>
                                {isPendingDeleteBlog && (
                                    <Loader2 className='ml-2 h-4 w-4 animate-spin' />
                                )}
                            </Button>
                        </div>
                    </AlertDialogContent>
                </AlertDialog>
            </PopoverContent>
        </Popover>
    )
}

export default BlogItemActionButton
