import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import React, { useEffect } from 'react'
import InviteUserHandler from './InviteUserHandler';
import { useStore } from '@/components/providers/StoreProvider';
import AvaiableUserHandler from './AvaiableUserHandler';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { UserRoundCogIcon } from 'lucide-react';

const ManageUserDialog = () => {

    const defaultAddingMode = useStore(state => state.defaultAddingMode);
    const isAddingMode = useStore(state => state.isAddingMode);

    useEffect(() => {
        defaultAddingMode();
    }, [])

    return (
        <Dialog>
            <TooltipProvider>
                <Tooltip>
                    <DialogTrigger asChild>
                        <TooltipTrigger asChild>
                            <Button variant={'ghost'} className='p-2'>
                                <UserRoundCogIcon className='h-5 w-5' />
                            </Button>
                        </TooltipTrigger>
                    </DialogTrigger>
                    <TooltipContent side='bottom'>
                        <p>Manage Member</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <DialogContent
                styledCard={true}
                className='p-6 lg:w-2/5'
                onInteractOutside={(e) => {
                    e.preventDefault()
                }}
            >
                <DialogHeader className='space-y-0'>
                    <h3 className='text-xl font-bold uppercase'>Manage member of project</h3>
                    <DialogDescription>
                        Invite new member to join this project or remove the member.
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                {isAddingMode ? <InviteUserHandler /> : <AvaiableUserHandler />}
            </DialogContent>
        </Dialog>

    )
}

export default ManageUserDialog