import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'
const Stars = () => {
    return (
        <div>
            <Button variant={'ghost'}>
                <Star className='mr-1' /> <span>99 Like</span>
            </Button>
        </div>
    )
}

export default Stars
