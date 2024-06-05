import { useAbility } from '@/lib/contexts/CaslContext'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export function useAuthRedirect() {
    const ability = useAbility()
    const router = useRouter()

    useEffect(() => {
        if (ability.can('manage', 'all')) {
            router.push('/admin')
        } else if (!ability.can('read', '/admin')) {
            router.push('/')
        }
    }, [ability, router])
}
