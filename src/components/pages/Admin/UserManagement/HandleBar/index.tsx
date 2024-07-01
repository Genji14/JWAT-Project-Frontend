import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, UserRoundPlusIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'

const HandleBar = () => {

    const [query, setQuery] = useState('');

    return (
        <div className='flex items-center gap-2'>
            <Input
                onChange={(evt) => setQuery(evt.target.value)}
                placeholder='Find users...'
                icon={<Search className='h-4 w-4 text-muted-foreground' />}
                className='w-96 py-5'
            />
            <Link href="/admin/users/create">
                <Button className='gap-2'>
                    <UserRoundPlusIcon className='h-5 w-5' />
                    <span>Create new user</span>
                </Button>
            </Link>

        </div>
    )
}

export default HandleBar;