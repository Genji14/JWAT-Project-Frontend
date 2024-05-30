import { Button } from '@/components/ui/button'
import { useExpandedStore } from '@/hooks/zustand'
import { cn } from '@/lib/utils'
import { Menu } from 'lucide-react'
import React from 'react'

const SidebarButton = () => {
    const toggle = useExpandedStore((state) => state.toggle)

    return (
        <div className={cn('flex h-full justify-center p-4 transition-all')}>
            <Button
                onClick={toggle}
                variant={'ghost'}
                className='h-fit w-fit p-2'
            >
                <Menu className='h-6 w-6' />
            </Button>
        </div>
    )
}

export default SidebarButton
