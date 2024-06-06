import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'
import { Button } from '@/components/ui/button'
import { LogOut, UserRound } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import dynamic from 'next/dynamic'
import Spinner from '@/components/shared/Spinner'
import { useCurrentUserInfo } from '@/hooks/query'
import { Skeleton } from '@/components/ui/skeleton'
import { convertAlt } from '@/lib/utils'

const EditProfileForm = dynamic(() => import('./EditProfileForm'), {
    loading: () => (
        <div className='p-10'>
            <Spinner />
        </div>
    ),
})

const ProfileMenu = () => {

    const router = useRouter();
    const { currentUserInfoData, isFetchingCurrentUserInfo } = useCurrentUserInfo();

    const handleLogOut = () => {
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        Cookies.remove('role')
        router.push('/sign-in')
    }

    if (isFetchingCurrentUserInfo) {
        return <Skeleton className="w-12 h-12 rounded-full" />
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                    <AvatarImage src={undefined} />
                    <AvatarFallback>{convertAlt(currentUserInfoData.fullName)}</AvatarFallback>
                </Avatar>
            </PopoverTrigger>
            <PopoverContent
                side='bottom'
                align='end'
                className='flex w-64 flex-col gap-1 p-2'
            >
                <Dialog>
                    <DialogTrigger asChild>
                        <div className='flex items-center gap-2 px-3 py-1.5 text-sm font-semibold rounded cursor-pointer hover:bg-accent'>
                            <UserRound className='h-4 w-4' />
                            <span>User profile</span>
                        </div>
                    </DialogTrigger>
                    <DialogContent
                        styledCard={true}
                        className='p-6 lg:w-1/2'
                        onInteractOutside={(e) => {
                            e.preventDefault()
                        }}
                    >
                        <EditProfileForm userInfo={currentUserInfoData} />
                    </DialogContent>
                </Dialog>
                <div className='px-2'>
                    <Separator />
                </div>
                <div className='flex items-center gap-2 px-3 py-1.5 text-sm font-semibold rounded cursor-pointer hover:bg-accent' onClick={handleLogOut}                >
                    <LogOut className='h-4 w-4' />
                    <span>Sign out</span>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default ProfileMenu
