import Spinner from '@/components/shared/Spinner'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { HashTag, Media } from '@/types'
import { IBlog } from '@/types/interfaces/Blog'
import { FolderCog } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const EditBlogForm = dynamic(() => import('./EditBlogForm'), {
    ssr: false,
    loading: () => (
        <div className='my-10'>
            <Spinner />
        </div>
    ),
})

const EditBlogDialog = ({
    blog,
    hashTag,
    media,
}: {
    blog: IBlog
    hashTag: HashTag[]
    media: Media[]
}) => {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
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
                    <h3 className='text-xl font-bold uppercase'>Edit Blog</h3>
                    <DialogDescription>
                        Change your blog information, hashtags or modify the
                        media.
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <ScrollArea className='max-h-[75vh] pr-4'>
                    <EditBlogForm
                        blog={blog}
                        media={media}
                        hashTag={hashTag}
                        setOpen={setOpen}
                    />
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

export default EditBlogDialog
