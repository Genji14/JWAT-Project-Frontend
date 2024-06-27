import { Button } from '@/components/ui/button'
import { useCreateOrRemoveStar } from '@/hooks/mutation/star.mutation';
import { useDebounce } from '@/hooks/useDebounce';
import { DEBOUNCE_TIME } from '@/lib/constants/SettingSystem';
import { cn } from '@/lib/utils';
import { Star as Stars } from '@/types';
import { Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'


const StarButton = ({ blogId, initialState, setTotalStars }: { blogId: number, initialState?: Stars[], setTotalStars: React.Dispatch<React.SetStateAction<number>> }) => {

    const decode: { id: number } | undefined = jwtDecode(Cookies.get("accessToken") ?? "");
    const [isActive, setIsActive] = useState(false);
    const [isFirstRender, setIsFirstRender] = useState(true);
    const activeDebounce = useDebounce(isActive, DEBOUNCE_TIME);
    const { mutateStar } = useCreateOrRemoveStar();

    useEffect(() => {
        if (initialState && initialState.some((star) => star.user.id === decode?.id)) {
            setIsActive(true);
        }
    }, [initialState])

    useEffect(() => {
        const handleStarChange = async () => {
            await mutateStar(blogId);
        }
        if (!isFirstRender) {
            handleStarChange();
        }
    }, [activeDebounce])


    function handleRaiseStar() {
        setIsActive((prev) => !prev);
        setTotalStars(prev => !isActive ? prev + 1 : prev - 1);
        setIsFirstRender(false);
    }

    return (
        <div>
            <Button variant={'ghost'} onClick={handleRaiseStar} className={cn("items-center gap-1.5", isActive && "text-yellow-500 hover:text-yellow-500")}>
                <Star className={cn('h-4 w-4', isActive && "fill-yellow-500")} /> <span>Raise Star</span>
            </Button>
        </div >
    )
}

export default StarButton;
