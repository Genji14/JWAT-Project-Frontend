import React, { useEffect } from 'react'
import SearchInput from './SearchInput'
import { Button } from '@/components/ui/button'
import { PackagePlus } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { FONT_POPPINS } from '@/lib/constants/SettingSystem'
import { cn } from '@/lib/utils'
import dynamic from 'next/dynamic'
import Spinner from '@/components/shared/Spinner'
import { Can, useAbility } from '@/components/providers/AbilityProvider'

const ProjectForm = dynamic(() => import('./ProjectForm'), {
    loading: () => (
        <div className='p-10'>
            <Spinner />
        </div>
    ),
    ssr: false,
})

const HandleBar = () => {

    // const ability = useAbility();

    return (
        <div className='flex items-center gap-2'>
            <SearchInput />
            {/* <Can I="create" a="Project" ability={ability}>
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
            </Can> */}
        </div>
    )
}

export default HandleBar
