import { useStore } from '@/components/providers/StoreProvider'
import StyledCard from '@/components/shared/StyledCard'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetBlogDetail } from '@/hooks/query/blog.query'
import { cn, convertAlt } from '@/lib/utils'
import { IBlog } from '@/types/interfaces/Blog'
import { format } from 'date-fns'
import { Ellipsis, Star } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import BlogMedia from '../BlogMedia'
import Comment from './Comment'
import StarButton from './StarButton'

const BlogItem = ({ blog, innerRef }: { blog: IBlog; innerRef?: any }) => {
    const currentUserId = useStore((state) => state.currentUserId)
    const { blogItemData, isFetchingBlogItem } = useGetBlogDetail(
        blog.id,
        blog.user.id
    )
    const [isExpandedText, setIsExpandedText] = useState<boolean>(false)

    useEffect(() => {
        console.log(currentUserId)
    }, [currentUserId])

    const isStarred =
        blogItemData?.stars.some((star) => star.user.id === currentUserId) ??
        false

    return (
        <StyledCard className='p-4'>
            <div ref={innerRef} className='flex items-center justify-between'>
                {isFetchingBlogItem ? (
                    <div className='flex items-center gap-2'>
                        <Skeleton className='h-12 w-12 rounded-full bg-border' />
                        <div className='space-y-1'>
                            <Skeleton className='h-4 w-48 bg-border' />
                            <Skeleton className='h-4 w-24 bg-border' />
                        </div>
                    </div>
                ) : (
                    <div className='flex items-center gap-1'>
                        <Avatar>
                            <AvatarImage
                                src={blogItemData?.userInfo.media?.url}
                                alt={blogItemData?.userInfo.fullName}
                            />
                            <AvatarFallback>
                                {convertAlt(
                                    blogItemData?.userInfo.fullName ?? ''
                                )}
                            </AvatarFallback>
                        </Avatar>
                        <div className='flex pl-2'>
                            <div>
                                <h3 className='font-semibold'>
                                    {blogItemData?.userInfo.fullName}
                                </h3>
                                <h5 className='text-sm text-muted-foreground'>
                                    {format(blog.createdAt, 'dd/MM/yyyy HH:mm')}
                                </h5>
                            </div>
                        </div>
                    </div>
                )}

                <Button variant={'ghost'}>
                    <Ellipsis />
                </Button>
            </div>
            <div className='flex flex-col space-y-4'>
                <p className='leading-0 mt-4 line-clamp-3 text-xl font-semibold'>
                    {blog.title}
                </p>
                <p
                    className={cn(
                        'px-4 text-justify text-sm text-muted-foreground',
                        !isExpandedText && 'line-clamp-5'
                    )}
                >
                    {blog.content &&
                        blog.content.split('\n').map((line, index) => (
                            <React.Fragment key={index}>
                                {line}
                                <br />
                            </React.Fragment>
                        ))}
                </p>
                {(blog.content.split('\n').length > 4 ||
                    blog.content.length > 256) && (
                    <span
                        className='cursor-pointer text-sm font-semibold text-primary/80 hover:text-primary'
                        onClick={() => setIsExpandedText((prev) => !prev)}
                    >
                        {!isExpandedText ? 'Show more' : 'Show less'}
                    </span>
                )}

                {!!blogItemData?.media.length && (
                    <BlogMedia media={blogItemData?.media} />
                )}
                {!!blogItemData?.hashTags.length && (
                    <div className='flex flex-wrap gap-1.5'>
                        {blogItemData?.hashTags.map((tag) => {
                            return (
                                <React.Fragment key={tag.id}>
                                    <div className='h-fit rounded border border-primary bg-primary/30 px-2'>
                                        <span className='text-xs font-semibold text-primary'>
                                            {tag.hashTagName}
                                        </span>
                                    </div>
                                </React.Fragment>
                            )
                        })}
                    </div>
                )}
            </div>
            <Separator className='my-3 bg-black dark:bg-border' />
            <div className='flex justify-between gap-5'>
                <div className='flex items-center gap-2'>
                    <StarButton blogId={blog.id} initialState={isStarred} />
                    <Comment />
                </div>
                <div className='flex items-center gap-1.5'>
                    {!!blogItemData?.stars.length && (
                        <>
                            <Star className='h-3 w-3 fill-yellow-500 text-yellow-500' />
                            <span className='text-xs font-semibold text-muted-foreground'>
                                {blogItemData?.stars.length}
                            </span>
                        </>
                    )}
                    {!!blogItemData?.stars.length &&
                        !!blogItemData?.comments.length && (
                            <Separator
                                orientation='vertical'
                                className='mx-1.5 h-1/2'
                            />
                        )}
                    {!!blogItemData?.comments.length && (
                        <span className='text-xs text-muted-foreground'>
                            {blogItemData?.comments.length} Commments
                        </span>
                    )}
                </div>
            </div>
        </StyledCard>
    )
}

export default BlogItem
