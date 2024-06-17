import { DialogDescription, DialogHeader } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import React, { useEffect } from 'react'
import InviteUserHandler from './InviteUserHandler';
import { useStore } from '@/components/providers/StoreProvider';
import AvaiableUserHandler from './AvaiableUserHandler';

const ManageUserDialog = () => {

    const defaultAddingMode = useStore(state => state.defaultAddingMode);
    const isAddingMode = useStore(state => state.isAddingMode);

    useEffect(() => {
        defaultAddingMode();
    }, [])

    return (
        <>
            <DialogHeader className='space-y-0'>
                <h3 className='text-xl font-bold uppercase'>Manage member of project</h3>
                <DialogDescription>
                    Invite new member to join this project or remove the member.
                </DialogDescription>
            </DialogHeader>
            <Separator />
            {isAddingMode ? <InviteUserHandler /> : <AvaiableUserHandler />}
        </>
    )
}

export default ManageUserDialog