import { useAbility } from '@/lib/contexts/CaslContext';
import { useRouter } from 'next/navigation';

import React, { PropsWithChildren, useEffect } from 'react';

type IRoleRedirectProps = PropsWithChildren<{
    children: React.ReactNode;
}>;

const RoleRedirect: React.FC<IRoleRedirectProps> = ({ children }) => {
    const ability = useAbility();
    const router = useRouter();

    useEffect(() => {
        if (ability.can('manage', 'all')) {
            router.push('/admin');
        } else if (!ability.can('read', '/admin')) {
            router.push('/');
        }
    }, [ability, router]);

    return <>{children}</>;
};

export default RoleRedirect;
