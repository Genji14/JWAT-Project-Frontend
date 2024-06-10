import React from 'react'
import SearchInput from './SearchInput'
import { Button } from '@/components/ui/button'
import { PackagePlus } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from '@/components/ui/dialog'
import { FONT_POPPINS } from '@/lib/constants/SettingSystem'
import { cn } from '@/lib/utils'
import Hydration from '@/components/shared/Hydration'
import dynamic from 'next/dynamic'
import Spinner from '@/components/shared/Spinner'

const ProjectForm = dynamic(() => import('./ProjectForm'), {
    loading: () => (
        <div className='p-10'>
            <Spinner />
        </div>
    ),
    ssr: false
})

const HandleBar = () => {
    return (
        <Hydration>
            <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-bold uppercase'>My projects</h2>
                <div className='flex items-center gap-2'>
                    <SearchInput />
                    <Dialog>
                        <DialogTrigger>
                            <Button className='gap-2'>
                                <PackagePlus className='h-5 w-5' />
                                <span>New Project</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent
                            styledCard={true}
                            className={cn(
                                'p-6 lg:w-1/2 xl:w-1/3',
                                FONT_POPPINS.className
                            )}
                            onInteractOutside={(e) => {
                                e.preventDefault()
                            }}
                        >
                            <ProjectForm />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </Hydration>
    )
}

export default HandleBar
