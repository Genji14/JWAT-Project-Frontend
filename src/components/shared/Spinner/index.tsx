import { Loader2 } from 'lucide-react'
import React from 'react'

const Spinner: React.FC = () => {
    return (
        <div>
            <div className='flex h-full w-full items-center justify-center p-10'>
                <Loader2 className='h-6 w-6 animate-spin text-primary' />
            </div>
        </div>
    )
}

export default Spinner
