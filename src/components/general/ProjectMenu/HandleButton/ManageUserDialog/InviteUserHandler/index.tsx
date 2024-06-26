import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useStore } from '@/components/providers/StoreProvider'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useDebounce } from '@/hooks/useDebounce'
import { useSearchUserNotInProject } from '@/hooks/query/project.query'
import InviteUserList from './UserList'
import { DEBOUNCE_TIME } from '@/lib/constants/SettingSystem'

const InviteUserHandler = () => {
    const toggleAdding = useStore((state) => state.toggleAdding)
    const [query, setQuery] = useState<string>('')

    const debounceQuery = useDebounce(query, DEBOUNCE_TIME)

    const { isFetchingUser, userData } =
        useSearchUserNotInProject(debounceQuery)

    console.log(userData)
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex items-center justify-between gap-2'>
                <h3 className='text-lg font-semibold'>Invite member</h3>
                <div className='flex items-center gap-2'>
                    <Input
                        icon={
                            <Search className='h-4 w-4 text-muted-foreground' />
                        }
                        value={query}
                        onChange={(evt) => setQuery(evt.target.value)}
                        placeholder='Search employee ID'
                        className='w-72'
                    />
                    <Button variant={'outline'} onClick={toggleAdding}>
                        Back
                    </Button>
                </div>
            </div>
            <InviteUserList data={userData} isFetching={isFetchingUser} />
        </div>
    )
}

export default InviteUserHandler
