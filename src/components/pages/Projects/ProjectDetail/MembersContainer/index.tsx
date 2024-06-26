import { IUserInfo } from '@/types/interfaces/User'
import React from 'react'
import { DataTable } from './MembersTable/data-table'
import columns from './MembersColumns/MembersColumns'

const MembersComtainer = ({ members }: { members: IUserInfo[] }) => {
    return (
        <div className='flex w-full flex-col justify-center gap-4'>
            <DataTable data={members} columns={columns} />
        </div>
    )
}

export default MembersComtainer
