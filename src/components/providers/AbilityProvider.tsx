import React, { createContext, useContext, useEffect } from 'react';
import { createContextualCan } from '@casl/react';
import { useStore } from './StoreProvider';
import { AbilityTuple, MongoAbility, MongoQuery } from '@casl/ability';
import { defineAbilities, updateAbility } from '@/lib/casl';
const ability = defineAbilities();

const AbilityContext = createContext<MongoAbility<AbilityTuple, MongoQuery>>(ability);

export const AbilityProvider = ({ children }: { children: React.ReactNode }) => {
    const role = useStore((state) => state.role);

    useEffect(() => {
        role && updateAbility(ability, role);
    }, [role, ability])

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
