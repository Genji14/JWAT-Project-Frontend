import { useRouter } from "next/navigation"
import { useEffect } from "react";

export const useRededirect = (path: string) => {
    const router = useRouter();

    useEffect(() => {
        router.push(path);
    }, [])

}