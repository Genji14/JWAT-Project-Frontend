import React from 'react';
import ProjectKnowledge from '../ProjectKnowledge';
import { useProjectDetailContext } from '@/lib/contexts/ProjectDetailProject';



const ProjectContainer: React.FC = () => {

    const { project } = useProjectDetailContext();

    return (
        <>
            <div className="grid grid-cols-3 lg:grid-cols-12 gap-4 ">
                <div className="col-span-3 lg:col-start-2 lg:col-span-7 w-full flex flex-col gap-2 rounded shadow-md">
                    <div className="flex gap-2 h-24 bg-background">
                        <div className='h-full'>
                        </div>
                    </div>
                    <div className="flex gap-2 h-24 bg-background">
                        <div className='h-full'>
                        </div>
                    </div>
                    <div className="flex gap-2 h-24 bg-background">
                        <div className='h-full'>
                        </div>
                    </div>
                    <div className="flex gap-2 h-24 bg-background">
                        <div className='h-full'>
                        </div>
                    </div>
                    <div className="flex gap-2 h-24 bg-background">
                        <div className='h-full'>
                        </div>
                    </div>
                    <div className="flex gap-2 h-24 bg-background">
                        <div className='h-full'>
                        </div>
                    </div>
                    <div className="flex gap-2 h-24 bg-background">
                        <div className='h-full'>
                        </div>
                    </div>
                    <div className="flex gap-2 h-24 bg-background">
                        <div className='h-full'>
                        </div>
                    </div>
                    <div className="flex gap-2 h-24 bg-background">
                        <div className='h-full'>
                        </div>
                    </div>
                    <div className="flex gap-2 h-24 bg-background">
                        <div className='h-full'>
                        </div>
                    </div>
                    <div className="flex gap-2 h-24 bg-background">
                        <div className='h-full'>
                        </div>
                    </div>
                    <div className="flex gap-2 h-24 bg-background">
                        <div className='h-full'>
                        </div>
                    </div>
                    <div className="flex gap-2 h-24 bg-background">
                        <div className='h-full'>
                        </div>
                    </div>
                    <div className="flex gap-2 h-24 bg-background">
                        <div className='h-full'>
                        </div>
                    </div>
                    <div className="flex gap-2 h-24 bg-background">
                        <div className='h-full'>
                        </div>
                    </div>
                    <div className="flex gap-2 h-24 bg-background">
                        <div className='h-full'>
                        </div>
                    </div>
                    <div className="flex gap-2 h-24 bg-background">
                        <div className='h-full'>
                        </div>
                    </div>
                </div>
                <div className="lg:col-start-10 col-span-3 w-full relative hidden lg:block">
                    <div className="sticky top-40">
                        <ProjectKnowledge knowledge={"hehe"} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectContainer;
