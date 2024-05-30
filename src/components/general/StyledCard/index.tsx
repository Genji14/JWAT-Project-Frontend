import { cn } from '@/lib/utils';
import React, { FC, PropsWithChildren } from 'react';

type IStyledCardProps = PropsWithChildren<{
    children: React.ReactNode,
    className?: string
}>;

const StyledCard: FC<IStyledCardProps> = ({ children, className }) => {
    return (
        <div className={cn("bg-background shadow-lg border-b-4 border-primary rounded-lg", className)}>
            {children}
        </div>
    );
};

export default StyledCard;
