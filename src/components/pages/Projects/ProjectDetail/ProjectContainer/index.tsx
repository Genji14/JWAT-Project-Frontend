import React from 'react';
import ProjectKnowledge from '../ProjectKnowledge';
import BlogList from '../BlogList';

const ProjectContainer: React.FC = () => {

    return (
        <>
            <div className="grid grid-cols-3 lg:grid-cols-12 gap-4 ">
                <div className="col-span-3 lg:col-start-2 lg:col-span-7 w-full flex flex-col gap-2">
                    <BlogList />
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
