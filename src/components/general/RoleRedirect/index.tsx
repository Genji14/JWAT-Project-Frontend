import { useStore } from '@/components/providers/StoreProvider';
import { UserRole } from '@/types/enums';
import { Loader2 } from 'lucide-react';
import { useRouter as useNavigation } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'

const RoleRedirect = () => {
    const [isRedirected, setIsRedirected] = useState(false);
    const role = useStore((state) => state.role);
    const router = useNavigation();
    const { pathname } = useRouter();

    useEffect(() => {
        setIsRedirected(false)
        if (role) {
            if (role == UserRole.ADMIN && !pathname.startsWith("/admin"))
                router.push("/admin/dashboard");
            if (role !== UserRole.ADMIN && pathname.startsWith("/admin"))
                router.push("/");
        }
        setIsRedirected(true);
    }, [pathname, role])

    return (
        <>
            {
                !isRedirected && <div className="inset-0 bg-background flex flex-col items-center justify-center fixed z-[999]">
                    <Loader2 className="w-12 h-12 animate-spin text-primary" />
                </div>
            }
        </>
    );
}

export default RoleRedirect;