import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { createContextualCan } from '@casl/react';
import { useStore } from './StoreProvider';
import { AbilityTuple, MongoAbility, MongoQuery } from '@casl/ability';
import { defineAbilitiesFor } from '@/lib/casl';

const defaultAbility = defineAbilitiesFor("MANAGER");

const AbilityContext = createContext<MongoAbility<AbilityTuple, MongoQuery>>(defaultAbility);

export const AbilityProvider = ({ children }: { children: React.ReactNode }) => {
    const role = useStore((state) => state.role);

    const ability = useMemo(() => {
        role ? defineAbilitiesFor(role) : defineAbilitiesFor("MANAGER")
    }, [role]);

    return (
        <AbilityContext.Provider value={ability}>
            {children}
        </AbilityContext.Provider>
    );
};

export const useAbility = (): MongoAbility<AbilityTuple, MongoQuery> => {
    const context = useContext(AbilityContext);
    if (!context) {
        throw new Error('useAbility must be used within AbilityProvider');
    }

    return context;
};

export const Can = createContextualCan(AbilityContext.Consumer);
