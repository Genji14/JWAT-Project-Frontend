import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { IBlog } from '@/types/interfaces/Blog'
import { format } from 'date-fns'
import { Ellipsis } from 'lucide-react'
import Comment from './Comment'
import Stars from './Star'

const BlogItem = ({ blog }: { blog: IBlog }) => {
    return (
        <div className='p-3'>
            <div className='flex items-center justify-between'>
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
                            <h3 className="font-bold">Trần Ngọc Phước Hoàng</h3>
                            <p className='text-sm text-muted-foreground'>
                                {format(blog.createdAt, 'dd/MM/yyyy HH:MM')}
                            </p>
                        </div>
                    </div>
                </div>
                <Button variant={'ghost'}>
                    <Ellipsis />
                </Button>
            </div>
            <div>
                <p className='my-3 line-clamp-3 text-xl font-bold'>
                    {blog.title}
                </p>
                <p className='text-justify text-muted-foreground'>{blog.content}</p>
            </div>
            <div className='mt-3 flex justify-between'></div>
            <Separator className='my-3 bg-black' />
            <div className='flex justify-end gap-5'>
                <Stars />
                <Comment />
            </div>
        </div>
    )
}

export default BlogItem
