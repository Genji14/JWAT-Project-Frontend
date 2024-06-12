// abilities.ts
import { UserRole } from '@/types/enums';
import { AbilityBuilder, createMongoAbility } from '@casl/ability';

type Actions = 'create' | 'read' | 'update' | 'delete' | 'reach';
type Subjects = 'Admin' | 'General' | 'Project';


export function defineAbilitiesFor(role: string) {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

    if (role) {
        switch (role) {
            case UserRole.ADMIN:
                can('reach', 'Admin');
                cannot('reach', 'General');
                break;
            case UserRole.MANAGER:
                can('reach', 'General');
                can('create', 'Project');
                cannot('reach', 'Admin');
                break;
            case UserRole.EMPLOYEE:
                can('reach', 'General');
                cannot('create', 'Project');
                cannot('reach', 'adminPage');
                break;
        }
    }

    return build();
}

