import { useStore } from '@/components/providers/StoreProvider'
import { Button } from '@/components/ui/button'
import React from 'react'

const UserInProjectHandler = () => {
    const toggleManage = useStore((state) => state.toggleManage)
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex items-center justify-between gap-2'>
                <h3 className='text-lg font-semibold'>Members</h3>
                <div className='flex items-center gap-2'>
                    <Button
                        onClick={toggleManage}
                        className='py-[9px]'
                        variant={'secondary'}
                    >
                        Watch
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default UserInProjectHandler
