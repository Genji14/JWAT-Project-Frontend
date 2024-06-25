import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'

const StarButton = () => {
    return (
        <div>
            <Button variant={'ghost'} className="items-center gap-1.5">
                <Star className='h-4 w-4' /> <span>Raise Star</span>
            </Button>
        </div>
    )
}

export default StarButton
