import { useAbility } from '@/components/providers/AbilityProvider';
import { useRouter as usNavigation } from 'next/navigation';
import { useRouter } from 'next/router';

import React, { useEffect } from 'react'

const RoleRedirect = () => {
    const ability = useAbility();
    const router = usNavigation();
    const { pathname } = useRouter();

    useEffect(() => {
        if (ability.can("reach", "Admin") && !pathname.startsWith("/admin"))
            router.push("/admin");
        if (ability.can("reach", "General") && pathname.startsWith("/admin"))
            router.push("/");
    }, [ability, pathname])

    return (
        <div>loading...</div>
    )
}

export default RoleRedirect;