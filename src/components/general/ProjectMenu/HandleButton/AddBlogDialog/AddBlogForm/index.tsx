import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useCreateBlog } from '@/hooks/mutation/blog.mutation'
import { blogSchema } from '@/lib/schemas'
import { IBlogForm } from '@/types/interfaces/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, X } from 'lucide-react'
import React, { SetStateAction, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Tag, TagInput } from 'emblor';
import MediaInput from './MediaInput'

const AddBlogForm = ({ setOpen }: { setOpen: React.Dispatch<SetStateAction<boolean>> }) => {
    const { mutateCreateBlog, isPendingCreateBlog } = useCreateBlog();

    const [tags, setTags] = useState<Tag[]>([]);
    const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

    const createBlogForm = useForm<IBlogForm>({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            title: '',
            content: '',
            hashTags: [],
            media: [],
        },
    })

    const removeVietnameseAccents = (str: string) => {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D')
    }

    async function onSubmit(values: IBlogForm) {
        try {
            const formData = new FormData()
            formData.append('title', values.title)
            formData.append('content', values.content)
            values.media.forEach((file) => {
                formData.append('files', file);
            });
            values.hashTags?.map((ht) => {
                formData.append('hashTags', ht)
            });
            await mutateCreateBlog(formData);
            createBlogForm.reset();
            setTags([]);
            setActiveTagIndex(null);
            setOpen(false);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Form {...createBlogForm}>
            <form
                onSubmit={createBlogForm.handleSubmit(onSubmit)}
                className='space-y-2'
            >
                <FormField
                    control={createBlogForm.control}
                    name='title'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Blog Title</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder='Title of the blog...'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={createBlogForm.control}
                    name='content'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Blog Content</FormLabel>
                            <FormControl>
                                <Textarea {...field} placeholder='Type the content...' rows={3} />
                            </FormControl>
                            <FormDescription className='text-xs'>
                                You can add content to the blog, describe issues
                                or share knowledge.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Controller
                    name="hashTags"
                    control={createBlogForm.control}
                    render={({ field }) => (
                        <div className='mt-2 space-y-2'>
                            <FormLabel>Tags</FormLabel>
                            <TagInput
                                {...field}
                                placeholder="Enter blog tags..."
                                maxTags={5}
                                showCount
                                tags={
                                    tags.map((tag) => {
                                        return {
                                            id: tag.id, text: removeVietnameseAccents(tag.text).toLowerCase().replace(/\s+/g, '')
                                        }
                                    })
                                }
                                setTags={(newTags) => {
                                    setTags(newTags);
                                    const newHashTags: string[] = tags.map((tag: Tag) => tag.text);
                                    field.onChange(newHashTags);
                                }}
                                activeTagIndex={activeTagIndex}
                                setActiveTagIndex={setActiveTagIndex}
                            />
                        </div>
                    )}
                />
                <MediaInput form={createBlogForm} />
                <div className='w-full pt-2'>
                    <Button
                        type='submit'
                        disabled={isPendingCreateBlog}
                        className='w-full'
                    >
                        <span>Complete</span>
                        {isPendingCreateBlog && (
                            <Loader2 className='ml-2 h-4 w-4 animate-spin' />
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default AddBlogForm
