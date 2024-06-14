import { IProject } from '@/types/interfaces/Project';
import React, { createContext, useState, useContext, PropsWithChildren } from 'react';

type TProjectDetailProviderProps = PropsWithChildren<{
    initialData: IProject
}>;

interface IProjectDetailContext {
    project: IProject;
}

const ProjectDetailContext = createContext<IProjectDetailContext | undefined>(undefined);

export const ProjectDetailProvider: React.FC<TProjectDetailProviderProps> = ({ children, initialData }) => {
    const [project] = useState<IProject>(initialData);

    return (
        <ProjectDetailContext.Provider value={{ project }}>
            {children}
        </ProjectDetailContext.Provider>
    );
};


export const useProjectDetailContext = (): IProjectDetailContext => {
    const context = useContext(ProjectDetailContext);
    if (!context) {
        throw new Error('useProjectDetailContext must be used within ProjectDetailProvider');
    }
    return context;
};
