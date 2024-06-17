import React from 'react'
import { Button } from '@/components/ui/button';
import { useStore } from '@/components/providers/StoreProvider';

const AvaiableUserHandler = () => {

    const toggleAdding = useStore(state => state.toggleAdding);

    return (
        <div className="flex flex-col gap-2">
            <div className='flex items-center justify-between gap-2'>
                <h3 className="font-semibold text-lg">Avaiable Members</h3>
                <div className="flex gap-2 items-center">
                    <Button onClick={toggleAdding} className='py-[9px]'>
                        Invite
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default AvaiableUserHandler;