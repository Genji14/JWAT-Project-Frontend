import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSearchBlog } from '@/hooks/mutation/blog.mutation'
import { Search } from 'lucide-react'
import { useRouter } from 'next/router'
import { useState } from 'react'

const SearchTool = () => {
    const [searchQuery, setSearchQuery] = useState('')
    // const { mutateSearchBlog, isPendingSearchBlog } = useSearchBlog()
    const router = useRouter()

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        // const data = await mutateSearchBlog(searchQuery)
        // console.log(data)
        // console.log('Search Term:', searchQuery)
        console.log(router.query)
        router.replace(
            `/projects/${router.query.id}/search?text=${searchQuery}`
        )
    }

    return (
        <form onSubmit={handleSubmit} className='flex items-center gap-2'>
            <Input
                type='text'
                placeholder='Search blog...'
                value={searchQuery}
                onChange={(evt) => setSearchQuery(evt.target.value)}
                className='h-fit w-96 rounded bg-accent/50 text-xs dark:placeholder:text-foreground/50 dark:focus-visible:outline-none'
            />
            <Button type='submit' className='h-fit w-fit p-2'>
                <Search className='h-4 w-4' />
            </Button>
        </form>
    )
}

export default SearchTool
