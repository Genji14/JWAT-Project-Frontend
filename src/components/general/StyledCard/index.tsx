import { cn } from '@/lib/utils'
import React, { FC, PropsWithChildren } from 'react'

type IStyledCardProps = PropsWithChildren<{
    children: React.ReactNode
    className?: string
}>

const StyledCard: FC<IStyledCardProps> = ({ children, className }) => {
    return (
        <div
            className={cn(
                'rounded-lg border-b-4 border-primary bg-background shadow-lg',
                className
            )}
        >
            {children}
        </div>
    )
}

export default StyledCard
