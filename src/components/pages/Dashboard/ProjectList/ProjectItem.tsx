import { AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { useFindUserById } from '@/hooks/query/user.query'
import { convertAlt } from '@/lib/utils'
import { IProject } from '@/types/interfaces/Project'
import { Avatar } from '@radix-ui/react-avatar'
import { format } from 'date-fns'
import { Crown } from 'lucide-react'
import Image from 'next/image'
import React, { FC } from 'react'

interface IProjectItemProps {
    project: IProject
}

const ProjectItem: FC<IProjectItemProps> = ({ project }) => {

    const { userInfoData, isFetchingUserInfo } = useFindUserById(project.id);

    return (
        <div className='aspect-square overflow-hidden flex flex-col rounded-lg shadow-md'>
            <div className='bg-background dark:bg-accent flex-auto'>
                <Image
                    height={500}
                    width={500}
                    className='h-full w-full object-cover aspect-video'
                    src={project.media.url}
                    alt={project.name}
                />

            </div>
            <div className='z-50 rounded-b-lg bg-background p-2 text-center text-sm shadow-md'>
                <div className='flex flex-col gap-2 px-2'>
                    <div className='flex items-center justify-between'>
                        <h2 className='truncate text-left text-base font-bold uppercase'>
                            {project.name}
                        </h2>
                        <h4 className='text-nowrap text-xs text-muted-foreground'>
                            {format(project.createdAt, 'PPP')}
                        </h4>
                    </div>
                    <div className='flex items-center gap-2'>
                        {
                            isFetchingUserInfo ?
                                <Skeleton className='h-10 w-10 rounded-full bg-border' />
                                :
                                (
                                    userInfoData &&
                                    <Avatar>
                                        <AvatarImage src={userInfoData.media?.url} alt={userInfoData.fullName} />
                                        <AvatarFallback>{convertAlt(userInfoData.fullName)}</AvatarFallback>
                                    </Avatar>
                                )

                        }
                        <div className='flex h-fit flex-col space-y-1 text-left'>
                            {
                                isFetchingUserInfo ? <Skeleton className='h-4 w-32 rounded-full bg-border' />
                                    : (
                                        userInfoData &&
                                        <h5 className='text-sm font-semibold text-primary'>
                                            {userInfoData.fullName}
                                        </h5>
                                    )
                            }
                            {
                                isFetchingUserInfo ? <Skeleton className='h-4 w-16 rounded-full bg-border' />
                                    : <div className='text-muted-foreground flex items-center gap-1'>
                                        <Crown className='w-3.5 h-3.5' />
                                        <span className='text-xs font-normal'>
                                            Owner
                                        </span>
                                    </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectItem
