import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton';
import { useFindUserById } from '@/hooks/query/user.query';
import { cn, convertAlt } from '@/lib/utils';
import { Comment } from '@/types'
import React from 'react'

const CommentItem = ({ comment }: { comment: Comment }) => {

    const { userInfoData, isFetchingUserInfo } = useFindUserById(comment.user.id);

    return (
        <div className='flex gap-3 items-start'>
            {
                isFetchingUserInfo ? <Skeleton className='w-12 h-12 bg-border rounded-full' />
                    : <Avatar>
                        <AvatarImage src={userInfoData?.media?.url} alt={userInfoData?.fullName} />
                        <AvatarFallback>{convertAlt(userInfoData?.fullName ?? "")}</AvatarFallback>
                    </Avatar>
            }

            <div className='grid space-y-2'>
                {isFetchingUserInfo ? <Skeleton className={cn('h-4 bg-border rounded-full my-1', comment.id % 2 === 0 ? 'w-36 ' : 'w-24')} /> : <h3 className='font-semibold'>{userInfoData?.fullName} <span className='text-muted-foreground'>#{userInfoData?.id}</span></h3>}
                {
                    isFetchingUserInfo ? <Skeleton className={cn('h-16 rounded-lg rounded-tl-none bg-border', comment.id % 2 === 0 ? 'w-80' : 'w-56')} /> :
                        <p className='px-3 py-1.5 bg-muted/50 rounded-lg rounded-tl-none w-fit'>
                            {comment.content && comment.content.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))}

                        </p>
                }
            </div>
        </div>
    )
}

export default CommentItem;