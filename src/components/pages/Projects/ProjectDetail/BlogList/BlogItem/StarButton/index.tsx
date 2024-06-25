import { Button } from '@/components/ui/button'
import { useCreateOrRemoveStar } from '@/hooks/mutation/star.mutation';
import { useDebounce } from '@/hooks/useDebounce';
import { DEBOUNCE_TIME } from '@/lib/constants/SettingSystem';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react'
import { useEffect, useState } from 'react'

const StarButton = ({ blogId, initialState }: { blogId: number, initialState: boolean }) => {

    const [isActive, setIsActive] = useState(initialState);
    const activeDebounce = useDebounce(isActive, DEBOUNCE_TIME);
    const { mutateStar } = useCreateOrRemoveStar();

    useEffect(() => {
        const handleStarChange = async () => {
            await mutateStar(blogId);
        }
        handleStarChange();
    }, [activeDebounce]);

    return (
        <div>
            <Button variant={'ghost'} onClick={() => setIsActive((prev) => !prev)} className={cn("items-center gap-1.5", isActive && "text-yellow-500 hover:text-yellow-500")}>
                <Star className={cn('h-4 w-4', isActive && "fill-yellow-500")} /> <span>Raise Star</span>
            </Button>
        </div>
    )
}

export default StarButton
