"use client"

import { useDebounce } from '@/hooks/useDebounce';
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ISearchProjectContext {
    debounceQuery: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchProjectContext = createContext<ISearchProjectContext | undefined>(undefined);

export const SearchProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [query, setQuery] = useState<string>("");
    const debounceQuery = useDebounce(query, 500);

    return (
        <SearchProjectContext.Provider value={{ debounceQuery, setQuery }}>
            {children}
        </SearchProjectContext.Provider>
    );
};


export const useSearchProjectContext = (): ISearchProjectContext => {
    const context = useContext(SearchProjectContext);
    if (!context) {
        throw new Error('useSearchProjectContext phải được dùng trong SearchProjectProvider');
    }
    return context;
};
