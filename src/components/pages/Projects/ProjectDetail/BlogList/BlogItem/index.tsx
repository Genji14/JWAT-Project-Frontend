import { useStore } from '@/components/providers/StoreProvider'
import StyledCard from '@/components/shared/StyledCard'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetBlogDetail } from '@/hooks/query/blog.query'
import { cn, convertAlt } from '@/lib/utils'
import { IBlog } from '@/types/interfaces/Blog'
import { format } from 'date-fns'
import { Star } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import BlogMedia from '../BlogMedia'
import CommentDialog from './CommentDialog'
import BlogItemActionButton from './BlogItemActionButton'
import StarButton from './StarButton'

const BlogItem = ({ blog, innerRef }: { blog: IBlog, innerRef?: any}) => {
    const { blogItemData, isFetchingBlogItem } = useGetBlogDetail(blog.id, blog.user.id);
    const [isExpandedText, setIsExpandedText] = useState<boolean>(false);
    const [totalStars, setTotalStars] = useState<number>(0);
    const [totalComments, setTotalComments] = useState<number>(0);


    useEffect(() => {
        if (blogItemData) {
            setTotalStars(blogItemData.stars.length);
            setTotalComments(blogItemData.comments.length);
            console.log(blogItemData)
        }
    }, [blogItemData])

    return (
        <StyledCard className='p-4'>
            <div ref={innerRef} className='flex items-start justify-between'>
                {isFetchingBlogItem ? (
                    <div className='flex items-center gap-2'>
                        <Skeleton className='h-12 w-12 bg-border rounded-full' />
                        <div className='space-y-1'>
                            <Skeleton className='bg-border h-4 w-48' />
                            <Skeleton className='bg-border h-4 w-24' />
                        </div>
                    </div>
                ) : (
                    <div className='flex items-center gap-1'>
                        <Avatar>
                            <AvatarImage
                                src={blogItemData?.userInfo.media?.url}
                                alt={blogItemData?.userInfo.fullName}
                            />
                            <AvatarFallback>{convertAlt(blogItemData?.userInfo.fullName ?? "")}</AvatarFallback>
                        </Avatar>
                        <div className='flex pl-2'>
                            <div>
                                <h3 className="font-semibold">{blogItemData?.userInfo.fullName}</h3>
                                <h5 className='text-sm text-muted-foreground'>
                                    {format(blog.createdAt, 'dd/MM/yyyy HH:mm')}
                                </h5>
                            </div>
                        </div>
                    </div>
                )}
                <BlogItemActionButton
                    blog={blog}
                    media={blogItemData?.media ?? []}
                    hashTag={blogItemData?.hashTags ?? []}
                />
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

                {
                    blog.content.split('\n').length > 4 && (
                        <span className='font-semibold cursor-pointer text-sm text-primary/80 hover:text-primary' onClick={() => setIsExpandedText((prev) => !prev)}>
                            {!isExpandedText ? "Show more" : "Show less"}
                        </span>
                    )
                }

                {
                    !!blogItemData?.media.length && <>
                        {isFetchingBlogItem ? <Skeleton className='w-full bg-border aspect-[25/9]' /> : <BlogMedia media={blogItemData?.media} />}
                    </>
                }
                {!!blogItemData?.hashTags.length && (
                    <div className='flex flex-wrap gap-1.5'>
                        {
                            isFetchingBlogItem ?
                                <>
                                    <Skeleton className='w-16 h-6 bg-border' />
                                    <Skeleton className='w-16 h-6 bg-border' />
                                    <Skeleton className='w-16 h-6 bg-border' />
                                </>
                                :
                                <>
                                    {blogItemData?.hashTags.map((tag) => (
                                        <div key={tag.id} className='border border-primary h-fit px-2 bg-primary/30 rounded'>
                                            <span className='text-xs font-semibold text-primary'>{tag.hashTagName}</span>
                                        </div>
                                    ))}
                                </>

                        }
                    </div>
                )}
            </div>
            <Separator className='my-3 bg-black dark:bg-border' />
            <div className='flex justify-between gap-5'>
                <div className='flex gap-2 items-center'>
                    <StarButton blogId={blog.id} initialState={blogItemData?.stars} setTotalStars={setTotalStars} />
                    <CommentDialog blogId={blog.id} setTotalComments={setTotalComments} />
                </div>
                <div className='flex gap-1.5 items-center'>
                    {!!totalStars && (
                        <>
                            <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                            <span className='text-xs font-semibold text-muted-foreground'>{totalStars}</span>
                        </>
                    )}
                    {!!totalStars && !!totalComments && (
                        <Separator orientation='vertical' className="h-1/2 mx-1.5" />
                    )}
                    {!!totalComments && (
                        <span className='text-xs text-muted-foreground'>{totalComments} Comments</span>
                    )}
                </div>
            </div>
        </StyledCard>
    )
}

export default BlogItem;
