import { Input } from '@/components/ui/input'
import { useSearchProjectContext } from '@/lib/contexts/SearchProjectContext';
import { Search } from 'lucide-react'
import React from 'react'

const SearchInput = () => {

    const { setQuery } = useSearchProjectContext();

    return (
        <Input
            onChange={(evt) => setQuery(evt.target.value)}
            placeholder='Find projects...'
            icon={<Search className='h-4 w-4 text-muted-foreground' />}
            className='w-96 py-5'
        />
    )
}

export default SearchInput
