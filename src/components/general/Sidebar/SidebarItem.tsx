import { useStore } from '@/components/providers/StoreProvider'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useEffect } from 'react'

const SidebarItem = ({
    icon,
    label,
    href,
}: {
    icon: React.ReactNode
    label: string
    href: string
}) => {
    const expanded = useStore((state) => state.expanded)

    // const isActive = (pathname === "/" && href === "/") || pathname === href || (pathname !== "/" && pathname?.startsWith(`${href}/`));

    useEffect(() => {
        console.log(expanded)
    }, [expanded])

    return (
        <li className='group relative'>
            <Link
                href={href}
                className={cn(
                    " relative flex items-center rounded p-2 text-muted-foreground after:absolute after:-right-3 after:top-0 after:h-0 after:w-[3px] after:bg-primary after:transition-all after:content-[''] hover:bg-primary/20 hover:after:h-full dark:hover:text-white"
                )}
            >
                {icon}
                <span
                    className={cn(
                        'overflow-hidden text-nowrap text-sm font-semibold transition-all',
                        expanded ? 'ml-3 w-52' : 'w-0'
                    )}
                >
                    {label}
                </span>
            </Link>
            <>
                {!expanded && (
                    <span
                        className='invisible absolute left-full top-1/2 z-20
                        ml-8 -translate-x-3 -translate-y-1/2 text-nowrap rounded border border-border bg-border px-4 py-2
                        font-semibold text-primary opacity-20 transition-all group-hover:visible 
                        group-hover:translate-x-0 group-hover:opacity-100 dark:bg-slate-800'
                    >
                        {label}
                    </span>
                )}
            </>
        </li>
    )
}
export default SidebarItem
