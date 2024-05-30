import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { LogOut, UserRoundCog } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import Hydration from '../Hydration'
import Cookies from 'js-cookie'
import { JwtPayload, jwtDecode } from 'jwt-decode'


const ProfileMenu = () => {

    useEffect(() => {
        console.log(jwtDecode<JwtPayload>(Cookies.get("accessToken")!));
    }, [])

    return (
        <Hydration>
            <Popover>
                <PopoverTrigger>
                    <Avatar>
                        <AvatarImage src='https://github.com/shadcn.png' />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </PopoverTrigger>
                <PopoverContent
                    side='bottom'
                    align='end'
                    className='flex w-64 flex-col gap-1 p-2'
                >
                    <Button
                        variant='ghost'
                        className='h-fit justify-start gap-2 px-3 py-1.5'
                    >
                        <UserRoundCog className='h-4 w-4' />
                        <span>Edit profile</span>
                    </Button>
                    <div className='px-2'>
                        <Separator />
                    </div>
                    <Button
                        variant='ghost'
                        className='h-fit justify-start gap-2 px-3 py-1.5'
                    >
                        <LogOut className='h-4 w-4' />
                        <span>Sign out</span>
                    </Button>
                </PopoverContent>
            </Popover>
        </Hydration>

    )
}

export default ProfileMenu
