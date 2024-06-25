import dynamic from 'next/dynamic'
import { Can, useAbility } from '@/components/providers/AbilityProvider'

const ManageKnowledgeDialog = dynamic(() => import('./ManageKnowledgeDialog'), {
    ssr: false,
})

const ManageUserDialog = dynamic(() => import('./ManageUserDialog'), {
    ssr: false,
})

const AddBlogDialog = dynamic(() => import('./AddBlogDialog'), {
    ssr: false,
})

const HandleButton = () => {

    const ability = useAbility();

    return (
        <div className='flex items-center gap-1'>
            <AddBlogDialog />
            <Can I="invite" a="User" ability={ability}>
                <ManageUserDialog />
            </Can>
            <Can I="invite" a="User" ability={ability}>
                <ManageKnowledgeDialog />
            </Can>
        </div>
    )
}

export default HandleButton
