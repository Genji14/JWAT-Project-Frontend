import * as React from 'react'
import Link from 'next/link'
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/router'
import { Slash } from 'lucide-react'

const ITEMS_TO_DISPLAY = 3

const AdminBreadCrumb = () => {
    const [open, setOpen] = React.useState(false)

    const router = useRouter()
    const { pathname } = router

    const pathSegments = pathname.split('/').filter(Boolean)

    // Sử dụng một biến để theo dõi xem segment 'ADMIN' đã được thêm vào chưa
    let adminAdded = false

    const items = pathSegments
        .map((segment, index, array) => {
            let label = ''
            let href = ''

            switch (segment.toUpperCase()) {
                case 'ADMIN':
                    if (!adminAdded) {
                        label = 'DASHBOARD'
                        adminAdded = true // Đánh dấu là 'ADMIN' đã được thêm vào
                    } else {
                        return null // Bỏ qua nếu 'ADMIN' đã được thêm
                    }
                    break
                case 'USERS':
                    label = 'USERS MANAGEMENT'
                    break
                case 'CREATE':
                    label = 'CREATE NEW'
                    break
                default:
                    label = segment.toUpperCase()
            }

            if (index === array.length - 1) {
                return { label }
            } else {
                href = '/' + pathSegments.slice(0, index + 1).join('/')
                return { href, label }
            }
        })
        .filter((item) => item !== null) // Loại bỏ các giá trị null

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        <BreadcrumbItem>
                            {item && item.href ? (
                                <BreadcrumbLink
                                    asChild
                                    className='hover:font-bold'
                                >
                                    <Link href={item.href}>{item.label}</Link>
                                </BreadcrumbLink>
                            ) : item ? (
                                <BreadcrumbPage className='font-bold'>
                                    {item.label}
                                </BreadcrumbPage>
                            ) : null}
                        </BreadcrumbItem>
                        {index < items.length - 1 && (
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                        )}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default AdminBreadCrumb
