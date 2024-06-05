import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'
import { Button } from '@/components/ui/button'
import { LogOut, UserRoundCog } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import Hydration from '../../shared/Hydration'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import dynamic from 'next/dynamic'
import Spinner from '@/components/shared/Spinner'

const EditProfileForm = dynamic(() => import('./EditProfileForm'), {
    loading: () => (
        <div className='p-10'>
            <Spinner />
        </div>
    ),
})

const ProfileMenu = () => {
    const router = useRouter()

    const handleLogOut = () => {
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        Cookies.remove('role')
        router.push('/sign-in')
    }

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
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                variant='ghost'
                                className='h-fit justify-start gap-2 px-3 py-1.5'
                            >
                                <UserRoundCog className='h-4 w-4' />
                                <span>Edit profile</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent
                            styledCard={true}
                            className='p-6 lg:w-1/2'
                            onInteractOutside={(e) => {
                                e.preventDefault()
                            }}
                        >
                            <EditProfileForm />
                        </DialogContent>
                    </Dialog>
                    <div className='px-2'>
                        <Separator />
                    </div>
                    <Button
                        variant='ghost'
                        className='h-fit justify-start gap-2 px-3 py-1.5'
                        onClick={handleLogOut}
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
