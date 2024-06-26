import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSearchBlog } from '@/hooks/mutation/blog.mutation'
import { Search } from 'lucide-react'
import { SetStateAction, useState } from 'react'

const SearchTool = () => {
    const [searchText, setSearchText] = useState('')
    const { mutateSearchBlog, isPendingSearchBlog } = useSearchBlog()

    const handleSearchInputChange = (e: { target: { value: SetStateAction<string> } }) => {
        setSearchText(e.target.value)
    }

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        const data = await mutateSearchBlog(searchText)
        console.log(data)
        console.log('Search Term:', searchText)
    }

    return (
        <div>
            {' '}
            <form
                onSubmit={handleSubmit}
                className='flex max-w-xl items-center space-x-2'
            >
                <Input
                    type='text'
                    placeholder='Search'
                    value={searchText}
                    onChange={handleSearchInputChange}
                />
                <Button type='submit' variant={'outline'}>
                    <Search />
                </Button>
            </form>
        </div>
    )
}

export default SearchTool
