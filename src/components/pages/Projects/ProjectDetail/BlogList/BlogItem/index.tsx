import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Ellipsis, MessageCircle, Star } from 'lucide-react'

const BlogItem = () => {
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
                            <p>Trần Ngọc Phước Hoàng</p>
                            <p className='text-sm'>24/06/2024 lúc 2:28PM</p>
                        </div>
                    </div>
                </div>
                <Button variant={'ghost'}>
                    <Ellipsis />
                </Button>
            </div>
            <div>
                <p className='my-3 line-clamp-3 text-xl font-bold'>
                    How to use cache in NestJS with Redis.
                </p>
                <p className='text-justify'>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Maxime, aliquid maiores quos odio possimus necessitatibus
                    magni praesentium voluptas cumque repudiandae minus laborum
                    iure perspiciatis aperiam officiis provident suscipit
                    placeat. Repellendus!
                </p>
            </div>
            <div className='mt-3 flex justify-between'></div>
            <Separator className='my-3 bg-black' />
            <div className='flex justify-end gap-5'>
                <Button variant={'ghost'}>
                    <Star className='mr-1' /> <span>99 Like</span>
                </Button>
                <Button variant={'ghost'}>
                    <MessageCircle className='mr-1' /> <span>30 Comment</span>
                </Button>
            </div>
        </div>
    )
}

export default BlogItem
