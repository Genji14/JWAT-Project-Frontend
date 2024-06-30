import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { convertAlt } from '@/lib/utils'
import { Comment } from '@/types'
import React from 'react'

const CommentItemSocket = ({ comment }: { comment: Comment }) => {
    return (
        <div className='flex items-start gap-3'>
            <Avatar>
                <AvatarImage
                    src={comment?.user?.media}
                    alt={comment?.user?.fullName}
                />
                <AvatarFallback>
                    {convertAlt(comment?.user?.fullName ?? '')}
                </AvatarFallback>
            </Avatar>

            <div className='grid space-y-2'>
                <h3 className='font-semibold'>
                    {comment?.user?.fullName}{' '}
                    <span className='text-muted-foreground'>
                        #{comment?.user?.id}
                    </span>
                </h3>
                <p className='w-fit rounded-lg rounded-tl-none bg-muted/50 px-3 py-1.5'>
                    {comment?.content &&
                        comment.content.split('\n').map((line, index) => (
                            <React.Fragment key={index}>
                                {line}
                                <br />
                            </React.Fragment>
                        ))}
                </p>
            </div>
        </div>
    )
}

export default CommentItemSocket
