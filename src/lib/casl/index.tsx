import { UserRole } from '@/types/enums';
import { AbilityBuilder, AbilityTuple, MongoAbility, MongoQuery, createMongoAbility } from '@casl/ability';

export function defineAbilities() {
    const { build } = new AbilityBuilder(createMongoAbility);
    return build();
}

export function updateAbility(ability: MongoAbility<AbilityTuple, MongoQuery>, role: UserRole | null) {
    const { can, cannot, rules } = new AbilityBuilder(createMongoAbility);


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
        default:
            cannot('read', 'all');
            break;
    }

    ability.update(rules);
    return ability;
}
