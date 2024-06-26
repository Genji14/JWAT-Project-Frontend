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
import SearchTool from "./SearchTool"
import { Separator } from "@/components/ui/separator"

export function ProjectMenu() {
    const expanded = useStore((state) => state.expanded);
    const { query } = useRouter();

    return (
        <div className={cn("transition-all fixed top-[4.5rem] z-50 px-4 py-2 bg-background border-b border-border flex justify-between shadow", expanded ? "left-0 xl:left-72 w-full xl:w-[calc(100%-18rem)]" : "left-0 xl:left-[4.5rem] w-full xl:w-[calc(100%-4.5rem)]")}>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link href={`/projects/${query.id}`} legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Blog
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href={`/projects/${query.id}/about`} legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                About
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href={`/projects/${query.id}/members`} legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Members
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center gap-6">
                <div className="hidden lg:block">
                    <SearchTool />
                </div>
                <Separator orientation="vertical" className="h-3/4 hidden lg:block" />
                <HandleButton />
            </div>
        </div >
    )
}