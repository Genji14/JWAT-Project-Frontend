import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'
import { Button } from '@/components/ui/button';
import { LogOut, UserRoundCog } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const ProfileMenu = () => {
    return (
        <Popover>
            <PopoverTrigger>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </PopoverTrigger>
            <PopoverContent side='bottom' align='end' className="flex flex-col p-2 gap-1 w-64">
                <Button variant="ghost" className="justify-start gap-2 px-3 py-1.5 h-fit">
                    <UserRoundCog className="w-4 h-4" />
                    <span>Chỉnh sửa thông tin</span>
                </Button>
                <div className="px-2">
                    <Separator />
                </div>
                <Button variant="ghost" className="justify-start gap-2 px-3 py-1.5 h-fit">
                    <LogOut className="w-4 h-4" />
                    <span>Đăng xuất</span>
                </Button>
            </PopoverContent>
        </Popover>
    )
}

export default ProfileMenu;
