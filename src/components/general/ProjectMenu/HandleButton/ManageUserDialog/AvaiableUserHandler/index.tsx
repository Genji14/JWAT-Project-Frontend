import React from 'react'
import { Button } from '@/components/ui/button'
import { useStore } from '@/components/providers/StoreProvider'

const AvaiableUserHandler = () => {
    const toggleAdding = useStore((state) => state.toggleAdding)

    return (
        <div className='flex flex-col gap-2'>
            <div className='flex items-center justify-between gap-2'>
                <h3 className='text-lg font-semibold'>Avaiable Members</h3>
                <div className='flex items-center gap-2'>
                    <Button onClick={toggleAdding} className='py-[9px]'>
                        Invite
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AvaiableUserHandler
