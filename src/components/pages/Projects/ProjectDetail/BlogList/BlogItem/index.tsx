import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useGetBlogDetail } from '@/hooks/query/blog.query'
import { IBlog } from '@/types/interfaces/Blog'
import { format } from 'date-fns'
import { Ellipsis, Star } from 'lucide-react'
import Comment from './Comment'
import React, { useEffect, useState } from 'react'
import { cn, convertAlt } from '@/lib/utils'
import StyledCard from '@/components/shared/StyledCard'
import { Skeleton } from '@/components/ui/skeleton'
import StarButton from './StarButton'

const BlogItem = ({ blog, innerRef }: { blog: IBlog, innerRef?: any }) => {

    const { blogItemData, isFetchingBlogItem } = useGetBlogDetail(blog.id, blog.user.id);
    const [isExpandedText, setIsExpandedText] = useState<boolean>(false);

    useEffect(() => {
        console.log(blogItemData)
    }, [blogItemData])

    return (
        <StyledCard className='p-4'>
            <div ref={innerRef} className='flex items-center justify-between'>
                {isFetchingBlogItem ? <div className='flex items-center gap-2'>
                    <Skeleton className='h-12 w-12 bg-border rounded-full' />
                    <div className='space-y-1'>
                        <Skeleton className='bg-border h-4 w-48' />
                        <Skeleton className='bg-border h-4 w-24' />
                    </div>
                </div> : <div className='flex items-center gap-1'>
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
                                {format(blog.createdAt, 'dd/MM/yyyy HH:MM')}
                            </h5>
                        </div>
                    </div>
                </div>
                }

                <Button variant={'ghost'}>
                    <Ellipsis />
                </Button>
            </div>
            <div className='space-y-4 flex flex-col'>
                <p className='mt-4 line-clamp-3 text-xl font-semibold leading-0'>
                    {blog.title}
                </p>
                <p className={cn("text-sm text-muted-foreground text-justify px-4", !isExpandedText && "line-clamp-5")}>
                    {blog.content && blog.content.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))}
                </p>
                {
                    (blog.content.split('\n').length > 4 || blog.content.length > 256)
                    && <span className='font-semibold cursor-pointer text-sm text-primary/80 hover:text-primary' onClick={() => setIsExpandedText((prev) => !prev)}>
                        {!isExpandedText ? "Show more" : "Show less"}
                    </span>
                }
            </div>
            <Separator className='my-3 bg-black dark:bg-border' />
            <div className='flex justify-between gap-5'>
                <div className='flex gap-1.5 items-center'>
                    {
                        !!blogItemData?.stars.length &&
                        <>
                            <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                            <span className='text-xs font-semibold text-muted-foreground'>{blogItemData?.stars.length}</span>
                        </>
                    }
                    {!!blogItemData?.stars.length && !!blogItemData?.comments.length && <Separator orientation='vertical' className="h-1/2 mx-1.5" />}
                    {
                        !!blogItemData?.comments.length &&
                        <span className='text-xs text-muted-foreground'>{blogItemData?.comments.length} Commments</span>
                    }
                </div>
                <div className='flex gap-2 items-center'>
                    <StarButton />
                    <Comment />
                </div>
            </div>
        </StyledCard>
    )
}

export default BlogItem
