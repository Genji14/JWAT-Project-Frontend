import { AspectRatio } from '@/components/ui/aspect-ratio';
import { IProject } from '@/types/interfaces/Project';
import React from 'react';

type TProjectContainerProps = {
    project: IProject
};

const ProjectContainer: React.FC<TProjectContainerProps> = ({ project }) => {
    return (
        <>
            <div className="flex flex-col gap-2">
                <AspectRatio ratio={6 / 1} className="w-full bg-background rounded shadow-md">
                    <div className="flex gap-2">
                        <div className='h-full'>

                        </div>
                    </div>
                </AspectRatio>
            </div>
        </>
    );
};

export default ProjectContainer;
