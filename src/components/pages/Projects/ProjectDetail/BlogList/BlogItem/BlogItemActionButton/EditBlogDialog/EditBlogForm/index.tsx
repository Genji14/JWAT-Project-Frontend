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
import { useUpdateBlog } from '@/hooks/mutation/blog.mutation'
import { blogSchema } from '@/lib/schemas'
import { HashTag, Media } from '@/types'
import { IBlog } from '@/types/interfaces/Blog'
import { IEditBlogForm } from '@/types/interfaces/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Tag, TagInput } from 'emblor'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import AvaiableMedia from './AvaiableMedia'
import MediaInput from './MediaInput'

const EditBlogForm = ({
    blog,
    hashTag,
    media,
    setOpen,
}: {
    blog: IBlog
    hashTag: HashTag[]
    media: Media[]
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const { mutateUpdateBlog, isPendingUpdateBlog } = useUpdateBlog(blog.id)

    const [tags, setTags] = useState<Tag[]>(
        hashTag.map((ht) => {
            return {
                id: ht.id.toString(),
                text: ht.hashTagName,
            } as Tag
        })
    )

    const [avaiableMedia, setAvaiableMedia] = useState(media);
    const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null)
    const [deleteHashTagIds, setDeleteHashTagIds] = useState<number[]>([])

    const editBlogForm = useForm<IEditBlogForm>({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            title: blog.title,
            content: blog.content,
            hashTags: [],
            media: [],
            deleteMediaIds: []
        },
    })

    useEffect(() => {
        const handleAddDeletedHashTag = () => {
            const initialTagIds = new Set<string>(hashTag.map(ht => ht.id.toString()));
            const currentTagIds = new Set<string>(tags.map(tag => tag.id));
            const initialTagIdsArray: string[] = [];
            initialTagIds.forEach(id => initialTagIdsArray.push(id));
            const removedTagIds = initialTagIdsArray.filter(id => !currentTagIds.has(id));
            setDeleteHashTagIds(removedTagIds.map(Number));
        }

        const handleAddNewHashTag = () => {
            const newTags = tags.filter(tag => !hashTag.some(ht => ht.hashTagName === tag.text));
            editBlogForm.setValue('hashTags', newTags.map(tag => tag.text));
        }

        handleAddDeletedHashTag();
        handleAddNewHashTag();
    }, [tags, editBlogForm])

    useEffect(() => {
        if (avaiableMedia.length === 0 && media.length > 0) {
            editBlogForm.setValue("deleteMediaIds", [...media.map(item => item.id)]);
        }
    }, [avaiableMedia, media])

    const removeVietnameseAccents = (str: string) => {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D')
    }


    async function onSubmit(values: IEditBlogForm) {
        try {
            const formData = new FormData()
            formData.append('title', values.title)
            formData.append('content', values.content)

            values.media.forEach((file) => {
                formData.append('files', file)
            })
            if (values.hashTags?.length > 0) {
                values.hashTags?.map((ht) => {
                    formData.append(`hashTags[]`, ht)
                })
            }
            if (editBlogForm.getValues("deleteMediaIds").length > 0) {
                editBlogForm.getValues("deleteMediaIds").map((item) => {
                    formData.append(`deleteMediaIds[]`, item.toString())
                })
            }
            if (deleteHashTagIds.length > 0) {
                deleteHashTagIds.map((ht) => {
                    formData.append(`deleteHashTagIds[]`, ht.toString())
                })
            }

            await mutateUpdateBlog({ blogId: blog.id, form: formData })
            editBlogForm.reset()
            setTags([])
            setActiveTagIndex(null)
            setOpen(false)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Form {...editBlogForm}>
            <form
                onSubmit={editBlogForm.handleSubmit(onSubmit)}
                className='space-y-2'
            >
                <FormField
                    control={editBlogForm.control}
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
                    control={editBlogForm.control}
                    name='content'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Blog Content</FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    placeholder='Type the content...'
                                    rows={5}
                                />
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
                    name='hashTags'
                    control={editBlogForm.control}
                    render={({ field }) => (
                        <div className='mt-2 space-y-2'>
                            <FormLabel>Tags</FormLabel>
                            <TagInput
                                {...field}
                                placeholder='Enter blog tags...'
                                maxTags={5}
                                showCount
                                tags={tags.map((tag) => {
                                    return {
                                        id: tag.id,
                                        text: removeVietnameseAccents(tag.text)
                                            .toLowerCase()
                                            .replace(/\s+/g, ''),
                                    }
                                })}
                                setTags={(newTags) => {
                                    setTags(newTags)
                                }}
                                activeTagIndex={activeTagIndex}
                                setActiveTagIndex={setActiveTagIndex}
                            />
                        </div>
                    )}
                />
                {avaiableMedia.length > 0 ? (
                    <AvaiableMedia
                        media={avaiableMedia}
                        setMedia={setAvaiableMedia}
                    />
                ) : (
                    <MediaInput form={editBlogForm} />
                )}

                <div className='w-full pt-2'>
                    <Button
                        type='submit'
                        disabled={isPendingUpdateBlog}
                        className='w-full'
                    >
                        <span>Complete</span>
                        {isPendingUpdateBlog && (
                            <Loader2 className='ml-2 h-4 w-4 animate-spin' />
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default EditBlogForm
