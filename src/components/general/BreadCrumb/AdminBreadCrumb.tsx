"use client"

import * as React from "react"
import Link from "next/link"

import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/router"
import { Slash } from "lucide-react"

const ITEMS_TO_DISPLAY = 3

const AdminBreadCrumb = () => {
    const [open, setOpen] = React.useState(false);

    const router = useRouter();
    const { pathname } = router;

    const pathSegments = pathname.split('/').filter(Boolean);

    const items = pathSegments.map((segment, index, array) => {
        let label = "";
        switch (segment.toUpperCase()) {
            case "ADMIN":
                label = "DASHBOARD";
                break;
            case "USERS":
                label = "USERS MANAGEMENT";
                break;
            case "CREATE":
                label = "CREATE NEW";
                break;
            default:
                label = segment.toUpperCase();
        }
        if (index === array.length - 1) {
            return { label };
        } else {
            const href = '/' + pathSegments.slice(0, index + 1).join('/');
            return { href, label };
        }
    });

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink className="hover:font-bold" href={items[0].href}>{items[0].label}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                    <Slash />
                </BreadcrumbSeparator>
                {items.length > ITEMS_TO_DISPLAY ? (
                    <>
                        <BreadcrumbItem>
                            <DropdownMenu open={open} onOpenChange={setOpen}>
                                <DropdownMenuTrigger
                                    className="flex items-center gap-1"
                                    aria-label="Toggle menu"
                                >
                                    <BreadcrumbEllipsis className="h-4 w-4" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    {items.slice(1, -2).map((item, index) => (
                                        <DropdownMenuItem key={index}>
                                            <Link href={item.href ? item.href : "#"}>
                                                {item.label}
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                    </>
                ) : null}
                {items.slice(-ITEMS_TO_DISPLAY + 1).map((item, index) => (
                    <BreadcrumbItem key={index}>
                        {item.href ? (
                            <>
                                <BreadcrumbLink
                                    asChild
                                    className="max-w-20 truncate md:max-w-none hover:font-bold"
                                >
                                    <Link href={item.href}>{item.label}</Link>
                                </BreadcrumbLink>
                                <BreadcrumbSeparator>
                                    <Slash />
                                </BreadcrumbSeparator>
                            </>
                        ) : (
                            <BreadcrumbPage className="max-w-20 truncate md:max-w-none font-bold">
                                {item.label}
                            </BreadcrumbPage>
                        )}
                    </BreadcrumbItem>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}


export default AdminBreadCrumb;