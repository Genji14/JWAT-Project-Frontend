import { useStore } from '@/components/providers/StoreProvider'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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

    const pathname = usePathname()

    const isActive =
        (pathname === '/' && href === '/') ||
        pathname === href ||
        (pathname !== "/" && pathname?.startsWith(`${href}/`))


    useEffect(() => {
        console.log(expanded)
    }, [expanded])

    return (
        <li className='group relative'>
            <Link
                href={href}
                className={cn(
                    " relative flex items-center rounded p-2 text-muted-foreground hover:text-primary after:absolute after:-right-2 after:top-0 after:h-0 after:w-[3px] after:bg-primary after:transition-all after:content-[''] hover:bg-primary/40 hover:after:h-full dark:hover:text-white",
                    isActive &&
                    'text-primary bg-primary/40 hover:bg-primary/40 after:h-full'
                )}
            >
                {icon}
                <span
                    className={cn(
                        'overflow-hidden text-nowrap text-sm font-bold transition-all',
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
                        ml-8 -translate-x-3 -translate-y-1/2 text-nowrap rounded bg-background px-3 py-1.5
                        font-bold text-primary opacity-20 transition-all group-hover:visible 
                        group-hover:translate-x-0 group-hover:opacity-100 dark:bg-accent'
                    >
                        {label}
                    </span>
                )}
            </>
        </li>
    )
}

export default SidebarItem
