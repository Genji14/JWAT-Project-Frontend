import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
    useGetCommentOfBlog,
    useGetHashTagOfBlog,
    useGetMediaOfBlog,
    useGetStarOfBlog,
} from '@/hooks/query/blog.query'
import { IBlog } from '@/types/interfaces/Blog'
import { format } from 'date-fns'
import { Ellipsis } from 'lucide-react'
import { useEffect } from 'react'
import Comment from './Comment'
import Stars from './Star'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import StyledCard from '@/components/shared/StyledCard'

const BlogItem = ({ blog, innerRef }: { blog: IBlog, innerRef?: any }) => {

    // const {} = useGetBlogDetail();
    const [isExpandedText, setIsExpandedText] = useState<boolean>(false);

    const { starData, isFetchingStar } = useGetStarOfBlog(blog.id)
    const { hashTagData, isFetchingHashTag } = useGetHashTagOfBlog(blog.id)
    const { commentData, isFetchingComment } = useGetCommentOfBlog(blog.id)
    const { mediaData, isFetchingMedia } = useGetMediaOfBlog(blog.id)

    useEffect(() => {
        console.log('star')
        console.log(starData)
        console.log('comment')
        console.log(commentData)
        console.log('hashTagData')
        console.log(hashTagData)
        console.log('mediaData')
        console.log(mediaData)
    })
    return (
        <StyledCard className='p-4'>
            <div ref={innerRef} className='flex items-center justify-between'>
                <div className='flex items-center'>
                    <Avatar>
                        <AvatarImage
                            src='https://github.com/shadcn.png'
                            alt='@shadcn'
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className='flex pl-2'>
                        <div>
                            <h3 className="font-semibold">Trần Ngọc Phước Hoàng</h3>
                            <h5 className='text-sm text-muted-foreground'>
                                {format(blog.createdAt, 'dd/MM/yyyy HH:MM')}
                            </h5>
                        </div>
                    </div>
                </div>
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
            <div className='flex justify-end gap-5'>
                <Stars />
                <Comment />
            </div>
        </StyledCard>
    )
}

export default BlogItem
