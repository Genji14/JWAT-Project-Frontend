import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'sonner'

const SearchTool = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        if (searchQuery.length === 0) {
            toast.info('Please provide at least one character!')
            return
        }
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
