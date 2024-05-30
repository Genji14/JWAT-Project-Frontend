import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react'

const SearchInput = () => {
    return (
        <Input
            placeholder='Find projects...'
            icon={<Search className='h-5 w-5 text-muted-foreground' />}
            className='w-96 py-5'
        />
    )
}

export default SearchInput
