import React, { FC, PropsWithChildren, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { cn, convertAlt } from '@/lib/utils'
import { format } from 'date-fns'
import { IUserInfo } from '@/types/interfaces/User'

type IAvatarFormProps = PropsWithChildren<{
    isPending: boolean
    userInfo: IUserInfo
    onAvatarChange: (avatar: File | null) => void
}>

const AvatarForm: FC<IAvatarFormProps> = ({
    isPending,
    userInfo,
    onAvatarChange,
}) => {
    const [photo, setPhoto] = useState('')
    const handleChangePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0]
            if (
                file &&
                (file.type === 'image/jpeg' || file.type === 'image/png')
            ) {
                setPhoto(URL.createObjectURL(file))
                onAvatarChange(file)
            }
        }
    }

    const handleRemovePhoto = () => {
        setPhoto('')
        onAvatarChange(null)
    }

    return (
        <div className='grid gap-4'>
            <div className='flex items-center gap-6'>
                <Avatar className='h-20 w-20'>
                    <AvatarImage
                        src={photo || (userInfo.media?.url ?? undefined)}
                    />
                    <AvatarFallback>
                        {convertAlt(userInfo.fullName)}
                    </AvatarFallback>
                </Avatar>
                <div className='h-full w-full'>
                    <div className='flex w-full items-center justify-between'>
                        <div className='flex items-center gap-1 font-semibold'>
                            <h4>{userInfo.fullName}</h4>
                            <span className='text-muted-foreground'>
                                #{userInfo.id}
                            </span>
                        </div>
                        <h4 className='font-semibold'>{userInfo.role}</h4>
                    </div>
                    <div className='mb-2 flex w-full items-center justify-between'>
                        <p className='text-sm text-muted-foreground'>
                            {userInfo.email}
                        </p>
                        <p className='text-sm text-muted-foreground'>
                            {format(userInfo.dob, 'PPP')}
                        </p>
                    </div>
                    <div className='flex gap-2'>
                        <div className='relative'>
                            <Label
                                className={cn(
                                    'rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground',
                                    isPending
                                        ? 'pointer-events-none opacity-50'
                                        : 'cursor-pointer hover:bg-primary/90'
                                )}
                                htmlFor='profile-photo'
                            >
                                Change
                            </Label>
                            {isPending && (
                                <div className='absolute inset-0 -top-[1px] z-10 h-[calc(100%+5px)] cursor-not-allowed rounded-lg opacity-0'></div>
                            )}
                            <Input
                                id='profile-photo'
                                className='sr-only hidden'
                                type='file'
                                accept='.jpg, .jpeg, .png'
                                onChange={handleChangePhoto}
                            />
                        </div>
                        {photo && !isPending && (
                            <Button
                                type='button'
                                onClick={handleRemovePhoto}
                                className='h-full px-3 py-[5.2px] text-xs'
                                variant={'outline'}
                            >
                                Remove
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AvatarForm
