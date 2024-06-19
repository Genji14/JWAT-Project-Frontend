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
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import MediaInput from './MediaInput'

const AddBlogForm = () => {
    const { mutateCreateBlog, isPendingCreateBlog } = useCreateBlog()
    const [hashTags, setHashTags] = useState<string[]>([])
    const [hashTag, setHashTag] = useState<string>('')
    const createBlogForm = useForm<IBlogForm>({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            title: '',
            content: '',
            hashTags: [],
            media: undefined,
        },
    })

    async function onSubmit(values: IBlogForm) {
        try {
            const formData = new FormData()
            formData.append('title', values.title)
            formData.append('content', values.content)
            if (values.media instanceof File) {
                formData.append('files', values.media)
            }
            values.hashTags?.map((ht) => {
                formData.append('hashTags', ht)
            })
            setHashTags([])
            setHashTag('')
            await mutateCreateBlog(formData)
            createBlogForm.reset()
        } catch (error) {
            console.error(error)
        }
    }

    const removeVietnameseAccents = (str: string) => {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D')
    }

    const handleAddHashTag = (hashT: string) => {
        if (hashT.length === 0) return
        const normalizedHashTag = removeVietnameseAccents(
            hashT.toLowerCase().replace(/\s+/g, '')
        )
        if (!hashTags.some((ht) => hashTag === ht)) {
            setHashTags((prev) => [...prev, normalizedHashTag])
            createBlogForm.setValue('hashTags', [
                ...createBlogForm.getValues('hashTags'),
                normalizedHashTag,
            ])
            setHashTag('')
        }
    }

    const handleDeleteHashTag = (id: number) => {
        setHashTags((prev) => prev.filter((_, index) => index !== id))
        createBlogForm.setValue('hashTags', [])
    }

    return (
        <Form {...createBlogForm}>
            <form
                onSubmit={createBlogForm.handleSubmit(onSubmit)}
                className='space-y-4'
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
                                    placeholder='Title the blog...'
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
                                <Textarea {...field} />
                            </FormControl>
                            <FormDescription className='text-xs'>
                                You can add content to the blog, describe issues
                                or share knowledge.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={createBlogForm.control}
                    name='hashTags'
                    render={() => (
                        <FormItem>
                            <FormLabel>Add HashTags</FormLabel>
                            <div className='flex w-full gap-2'>
                                <div className='flex-auto'>
                                    <Input
                                        value={hashTag}
                                        placeholder='Enter HashTag...'
                                        onChange={(evt) =>
                                            setHashTag(evt.target.value)
                                        }
                                    />
                                </div>
                                <Button
                                    className='w-1/4'
                                    onClick={() => handleAddHashTag(hashTag)}
                                    type='button'
                                >
                                    Add
                                </Button>
                            </div>
                            <div className='flex flex-wrap items-center gap-2'>
                                {hashTags.length > 0 &&
                                    hashTags.map((item, index) => (
                                        <div
                                            className='flex items-center rounded-md bg-gray-200 p-1'
                                            key={item}
                                        >
                                            <FormField
                                                control={createBlogForm.control}
                                                name='hashTags'
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                                                            <FormLabel className='font-normal'>
                                                                {item}
                                                            </FormLabel>
                                                        </FormItem>
                                                    )
                                                }}
                                            />
                                            <Button
                                                onClick={() =>
                                                    handleDeleteHashTag(index)
                                                }
                                                variant={'destructive'}
                                                className='ms-1 h-fit w-fit p-1'
                                            >
                                                <X className='h-3 w-3' />
                                            </Button>
                                        </div>
                                    ))}
                            </div>
                        </FormItem>
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
