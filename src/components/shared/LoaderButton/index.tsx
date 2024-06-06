import { Loader2 } from 'lucide-react'
import React from 'react'
import { Button, ButtonProps } from '../../ui/button'
import { cn } from '@/lib/utils'

type LoaderButtonProps = ButtonProps & {
    isLoading?: boolean
    children: React.ReactNode
    className?: string
}

export const LoaderButton = React.forwardRef<
    HTMLButtonElement,
    LoaderButtonProps
>(({ isLoading, children, className }) => {
    return (
        <Button disabled={isLoading} className={cn(className)}>
            {children}
            {isLoading && <Loader2 className='ml-2 h-5 w-5 animate-spin' />}
        </Button>
    )
})
