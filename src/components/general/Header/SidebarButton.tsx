import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from '@/components/ui/sheet'
import { useExpandedStore } from '@/hooks/zustand'
import { cn } from '@/lib/utils'
import { Menu } from 'lucide-react'
import React from 'react'
import Sidebar from '../Sidebar'
import { Separator } from '@/components/ui/separator'

const SidebarButton = () => {
    const toggle = useExpandedStore((state) => state.toggle)

    return (
        <div className={cn('flex h-full justify-center p-4 transition-all')}>
            <Button
                onClick={toggle}
                variant={'ghost'}
                className='hidden h-fit w-fit p-2 xl:block'
            >
                <Menu className='h-6 w-6' />
            </Button>

            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant={'ghost'}
                        className='h-fit w-fit p-2 xl:hidden'
                    >
                        <Menu className='h-6 w-6' />
                    </Button>
                </SheetTrigger>
                <SheetContent side={'top'} className='flex h-96 flex-col gap-2'>
                    <SheetHeader className='font-bold uppercase'>
                        Main menu
                    </SheetHeader>
                    <Separator />
                    <Sidebar expanded={false} />
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default SidebarButton
