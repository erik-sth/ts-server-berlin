import type Item from '../../types/Item';
import { Group } from '../../Class/Groups';

function allocateGroupsToItems(items: Item[], groups: Group[]): void {
    items.forEach((item) => (item.studentIds = []));
    groups.forEach((group) => {
        group.paths.forEach((path_config) => {
            if (path_config.valueForTestingStudentDistribution !== 0) {
                const studentsCount =
                    path_config.valueForTestingStudentDistribution;

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
        });
    });
}

export { allocateGroupsToItems };
