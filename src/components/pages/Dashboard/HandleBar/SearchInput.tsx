import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import React from 'react'

const SearchInput = () => {
    return (
        <Input
            placeholder='Find projects...'
            icon={<Search className="w-5 h-5 text-muted-foreground" />}
            className="py-5 w-96"
        />
    )
}

export default SearchInput;
