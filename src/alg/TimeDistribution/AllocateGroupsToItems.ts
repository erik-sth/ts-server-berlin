import type Item from '../../types/Item';
import { type Path_config } from '../../types/Path_config';
import { Group } from '../../Class/Groups';

function allocateGroupsToItems(
    path_configs: Path_config[],
    items: Item[],
    groups: Group[]
): void {
    items.forEach((item) => (item.studentIds = []));
    path_configs.forEach((path_config) => {
        if (path_config.valueForTestingStudentDistribution !== 0) {
            const groupId = path_config.groupId;
            const studentsCount =
                path_config.valueForTestingStudentDistribution;

            const group = groups.find((group) => groupId === group._id);

            if (group) {
                const ids = Array.from({ length: studentsCount }, () =>
                    group.studentIds.shift()
                );

                path_config.path.forEach((eventId) => {
                    if (items.some((item) => item === eventId)) {
                        const item = items.find((item) => item === eventId);
                        if (item) {
                            item.studentIds.push(...ids);
                        }
                    }
                });
            }
        }
    });
}

export { allocateGroupsToItems };
