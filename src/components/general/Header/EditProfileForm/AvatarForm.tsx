import React, { FC, PropsWithChildren, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button';
import { IUserInfo } from '@/types/interfaces';
import { convertAlt } from '@/lib/utils';
import { format } from 'date-fns';

type IAvatarFormProps = PropsWithChildren<{
    userInfo: IUserInfo,
    onAvatarChange: (avatar: File | null) => void
}>

const AvatarForm: FC<IAvatarFormProps> = React.memo(({ userInfo, onAvatarChange }) => {

    const [photo, setPhoto] = useState('');


    const handleChangePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
                setPhoto(URL.createObjectURL(file));
                onAvatarChange(file);
            }
        }
    }

    const handleRemovePhoto = () => {
        setPhoto('');
        onAvatarChange(null);
    }

    return (
        <>
            <div className='grid gap-4'>
                <div className='flex items-center gap-6'>
                    <Avatar className='h-20 w-20'>
                        <AvatarImage src={photo || 'https://github.com/shadcn.png'} />
                        <AvatarFallback>{convertAlt(userInfo.fullName)}</AvatarFallback>
                    </Avatar>
                    <div className='h-full w-full'>
                        <div className="flex justify-between items-center w-full">
                            <div className='flex items-center font-semibold gap-1'>
                                <h4>{userInfo.fullName}</h4>
                                <span className='text-muted-foreground'>#{userInfo.id}</span>
                            </div>
                            <h4 className="font-semibold">{userInfo.role}</h4>
                        </div>
                        <div className="flex justify-between items-center w-full mb-2">
                            <p className='text-sm text-muted-foreground'>
                                {userInfo.email}
                            </p>
                            <p className='text-sm text-muted-foreground'>
                                {format(userInfo.dob, "PPP")}
                            </p>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <Label className='cursor-pointer rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground hover:bg-primary/90' htmlFor='profile-photo'>
                                Change
                            </Label>
                            <Input
                                id='profile-photo'
                                className='sr-only hidden'
                                type='file'
                                accept=".jpg, .jpeg, .png"
                                onChange={handleChangePhoto}
                            />
                            {
                                photo && <Button type="button" onClick={handleRemovePhoto} className="px-3 py-[5px] h-fit w-fit text-xs" variant={"outline"}>Remove</Button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
});

export default AvatarForm;
