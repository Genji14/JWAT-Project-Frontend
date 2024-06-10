import { UserRole } from '@/types/enums';
import { AbilityBuilder, createMongoAbility } from '@casl/ability';

export default function defineAbilitiesFor(role: UserRole) {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);


    switch (role) {
        case UserRole.ADMIN:
            can('manage', 'all'); // Quản lý tất cả mọi thứ
            break;
        case UserRole.MANAGER:
            can('read', 'all'); // Đọc tất cả mọi thứ
            can('update', 'Task'); // Cập nhật Task
            cannot('delete', 'Task'); // Không được xóa Task
            break;
        case UserRole.EMPLOYEE:
            can('read', 'all'); // Đọc tất cả mọi thứ
            can('update', 'Task'); // Cập nhật Task
            can('delete', 'Task'); // Xóa Task
            break;
    }

    return build();
}
