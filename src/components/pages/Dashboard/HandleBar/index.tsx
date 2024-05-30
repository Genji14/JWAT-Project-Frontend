import React from 'react'
import SearchInput from './SearchInput'
import { Button } from '@/components/ui/button'
import { PackagePlus } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
} from '@/components/ui/dialog'
import { FONT_POPPINS } from '@/lib/constants/SettingSystem'
import { cn } from '@/lib/utils'
import ProjectForm from './ProjectForm'
import Hydration from '@/components/general/Hydration'

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
                            className={cn('w-1/3', FONT_POPPINS.className)}
                            onInteractOutside={(e) => {
                                e.preventDefault()
                            }}
                        >
                            <DialogHeader>
                                <h3 className='text-xl font-bold uppercase'>
                                    Create New Project
                                </h3>
                                <DialogDescription>
                                    Name a project for sharing knowledge each
                                    other.
                                </DialogDescription>
                            </DialogHeader>
                            <ProjectForm />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </Hydration>
    )
}

export default HandleBar
