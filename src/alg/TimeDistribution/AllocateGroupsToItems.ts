import type Item from '../../types/Item';
import { type Path } from '../../types/Path';
import { Group } from '../../Class/Groups';

function allocateGroupsToItems(
    paths: Path[],
    items: Item[],
    groups: Group[]
): void {
    items.forEach((item) => (item.studentIds = []));
    paths.forEach((path) => {
        if (path.valueForTestingStudentDistribution !== 0) {
            const groupId = path.groupId;
            const studentsCount = path.valueForTestingStudentDistribution;

            const group = groups.find((group) => groupId === group._id);

            if (group) {
                const ids = Array.from({ length: studentsCount }, () =>
                    group.studentIds.shift()
                );

                path.path.forEach((eventId) => {
                    if (items.some((item) => item._id === eventId)) {
                        const item = items.find((item) => item._id === eventId);
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
