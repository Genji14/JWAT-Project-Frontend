import { createContext, useContext } from 'react';
import { createMongoAbility } from '@casl/ability';

export const AbilityContext = createContext(createMongoAbility());
export const useAbility = () => useContext(AbilityContext);
