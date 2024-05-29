import React from 'react'
import SearchInput from './SearchInput';
import { Button } from '@/components/ui/button';
import { PackagePlus } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { FONT_POPPINS } from '@/lib/constants/SettingSystem';
import { cn } from '@/lib/utils';
import ProjectForm from './ProjectForm';
import Hydration from '@/components/general/Hydration';

const HandleBar = () => {
    return (
        <Hydration>

            <div className="flex items-center justify-between">
                <h2 className="font-bold text-2xl uppercase">My projects</h2>
                <div className='flex gap-2 items-center'>
                    <SearchInput />
                    <Dialog>
                        <DialogTrigger>
                            <Button className="gap-2">
                                <PackagePlus className='w-5 h-5' />
                                <span>New Project</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className={cn("w-1/3", FONT_POPPINS.className)} onInteractOutside={(e) => { e.preventDefault(); }}>
                            <DialogHeader>
                                <h3 className="uppercase font-bold text-xl">Create New Project</h3>
                                <DialogDescription>Name a project for sharing knowledge each other.</DialogDescription>
                            </DialogHeader>
                            <ProjectForm />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </Hydration>
    )
}

export default HandleBar;
