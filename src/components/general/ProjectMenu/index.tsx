import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { useStore } from "@/components/providers/StoreProvider"
import HandleButton from "./HandleButton"
import { useRouter } from "next/router"


export function ProjectMenu() {
    const expanded = useStore((state) => state.expanded);
    const { query, pathname } = useRouter();

    return (
        <div className={cn("transition-all fixed top-[4.5rem] z-10 px-4 py-2 bg-background border-b border-border flex justify-between", expanded ? "left-72  w-[calc(100%-18rem)]" : "left-[4.5rem]  w-[calc(100%-4.5rem)]")}>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem className={cn(pathname === `/projects/${query.id}/about`)}>
                        <Link href={`/projects/${query.id}/about`} legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                About
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <HandleButton />
        </div>
    )
}