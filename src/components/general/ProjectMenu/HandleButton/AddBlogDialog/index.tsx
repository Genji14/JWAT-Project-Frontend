import { useStore } from '@/components/providers/StoreProvider'
import { DialogDescription, DialogHeader } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { useEffect } from 'react'
import AddBlogForm from './AddBlogForm'
import { ScrollArea } from '@/components/ui/scroll-area'

const AddBlogDialog = () => {
    const defaultAddingMode = useStore((state) => state.defaultAddingMode)

    useEffect(() => {
        defaultAddingMode()
    }, []);

    return (
        <>
            <DialogHeader className='space-y-0'>
                <h3 className='text-xl font-bold uppercase'>Add New Blog</h3>
                <DialogDescription>
                    You can share knowledge or raise issues with new.
                </DialogDescription>
            </DialogHeader>
            <Separator />
            <ScrollArea className="max-h-[75vh] pr-4">
                <AddBlogForm />
            </ScrollArea>
        </>
    )
}

export default AddBlogDialog
