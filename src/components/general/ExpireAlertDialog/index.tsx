import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

const ExpireAlertDialog = () => {

    const [isExpired, setIsExpired] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const checkExpired = () => {
            if (Cookies.get("expired")) {
                setIsExpired(true);
            }
        };

        checkExpired();
        const interval = setInterval(checkExpired, 1000);
        return () => clearInterval(interval);
    }, []);

    function handleCloseDialog() {
        Cookies.remove("expired");
        setIsExpired(false);
        router.push("/sign-in");
    }


    return (
        <AlertDialog open={isExpired}>
            <AlertDialogContent className='max-w-lg'>
                <AlertDialogHeader>
                    <AlertDialogTitle>Token expired</AlertDialogTitle>
                    <AlertDialogDescription>
                        Your working session expired, please sign in again to access the system.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction asChild>
                        <Button onClick={handleCloseDialog}>
                            Okay
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ExpireAlertDialog