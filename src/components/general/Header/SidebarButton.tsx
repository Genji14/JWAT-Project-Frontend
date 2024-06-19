import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { ArrowLeft, Menu } from 'lucide-react'
import React, { useEffect } from 'react'
import Sidebar from '../Sidebar'
import { Separator } from '@/components/ui/separator'
import { useStore } from '@/components/providers/StoreProvider'
import { useRouter } from 'next/router'
import Link from 'next/link'


const SidebarButton = () => {
    const toggle = useStore((state) => state.toggle);
    const block = useStore((state) => state.block);

    const { pathname } = useRouter();

    useEffect(() => {
        if (pathname.startsWith("/projects")) {
            block();
        }
    }, [pathname])

    return (
        <div className={cn('flex h-full justify-center p-4 transition-all')}>
            {
                pathname.startsWith("/projects") ?
                    <Link href="/">
                        <Button
                            variant={'ghost'}
                            className='p-2'
                        >
                            <ArrowLeft className='h-6 w-6' />
                        </Button>
                    </Link>
                    :
                    <Button
                        onClick={toggle}
                        variant={'ghost'}
                        className='hidden p-2 xl:block'
                    >
                        <Menu className='h-6 w-6' />
                    </Button>
            }


            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant={'ghost'}
                        className='p-2 xl:hidden'
                    >
                        <Menu className='h-6 w-6' />
                    </Button>
                </SheetTrigger>
                <SheetContent side={'top'} className='flex h-96 flex-col gap-2'>
                    <SheetHeader className='font-bold uppercase'>
                        Main menu
                    </SheetHeader>
                    <Separator />
                    <Sidebar />
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default SidebarButton
