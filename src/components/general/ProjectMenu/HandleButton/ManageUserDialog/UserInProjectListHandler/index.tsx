import { useStore } from '@/components/providers/StoreProvider'
import { Button } from '@/components/ui/button'
import React from 'react'
import MemberList from './MemberList'
import { useSearchUsersInProject } from '@/hooks/query/project.query'

const UserInProjectListHandler = () => {
    const toggleManage = useStore((state) => state.toggleManage)
    const { usersData, isFetchingUsers } = useSearchUsersInProject()
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex items-center justify-between gap-2'>
                <h3 className='text-lg font-semibold'>
                    Members already in project
                </h3>
                <div className='flex items-center gap-2'>
                    <></>
                    <Button variant={'outline'} onClick={toggleManage}>
                        Back
                    </Button>
                </div>
            </div>
            <MemberList data={usersData} isFetching={isFetchingUsers} />
        </div>
    )
}

export default UserInProjectListHandler
