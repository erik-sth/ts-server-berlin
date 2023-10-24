import { Group } from '../../Class/Groups';
import { PriorityQueue } from '../../Class/PriorityQueue';
import Item from '../../types/Item';
import { Path_config } from '../../types/Path_config';
import { getMaxAvailableCapacity } from './FindPaths';

const MAX_ITERATIONS = 2000;
let currentIterationCount = 0;
let failed = false;

function createRecordOfCurrentUsedCapacity(
    paths: Path_config[]
): Record<string, number> {
    const record: Record<string, number> = {};
    paths.forEach((path) => {
        path.path.forEach((pathItem) => {
            record[pathItem] =
                (record[pathItem] || 0) +
                path.valueForTestingStudentDistribution;
        });
    });
    return record;
}

function distributeStudentsToPaths(
    pq: PriorityQueue<Group>,
    items: Item[],
    paths: Path_config[]
): void {
    while (!pq.isEmpty()) {
        const group = pq.dequeue();
        let amountStudentsRemaining = group.studentIds.length;

        paths.forEach((path) => {
            if (path.groupId === group._id && amountStudentsRemaining > 0) {
                const min = Math.min(
                    getMaxAvailableCapacity(path.path, items) -
                        path.valueForTestingStudentDistribution,
                    amountStudentsRemaining
                );
                amountStudentsRemaining -= min;
                path.valueForTestingStudentDistribution
                    ? (path.valueForTestingStudentDistribution = min)
                    : (path.valueForTestingStudentDistribution += min);
            }
        });
    }

    checkForExceedingGroupCapacities(paths, items);
}

// function getCurrentMaxAvailableCapacity(
//     path: string[],
//     items: Item[],
//     record: Record<string, number>
// ): number {
//     return Math.min(
//         ...items
//             .filter((item) => path.includes(item._id))
//             .map((item) => item.groupCapazity - record[item._id])
//     );
// }
function checkForExceedingGroupCapacities(
    paths: Path_config[],
    items: Item[]
): void {
    const record = createRecordOfCurrentUsedCapacity(paths);
    items.forEach((item) => {
        if (record[item._id] > item.groupCapazity) {
            redistribute(
                item._id,
                record[item._id] - item.groupCapazity,
                items,
                paths
            );
        }
    });
}
function redistribute(
    failedId: string,
    excessStudents: number,
    items: Item[],
    paths: Path_config[]
): boolean {
    paths.forEach((path) => {
        const alternativePaths = paths.filter(
            (pathItem) =>
                pathItem.groupId === path.groupId &&
                !pathItem.path.includes(failedId)
        );

        const failedGroupPaths = paths.filter(
            (pathItem) =>
                pathItem.groupId === path.groupId &&
                pathItem.path.includes(failedId)
        );

        if (failedGroupPaths.length !== 0 && excessStudents !== 0) {
            failedGroupPaths.sort(
                (a, b) =>
                    b.valueForTestingStudentDistribution -
                    a.valueForTestingStudentDistribution
            );

            failedGroupPaths.forEach((failedPath) => {
                const removeCount =
                    failedPath.valueForTestingStudentDistribution -
                    excessStudents;
                failedPath.valueForTestingStudentDistribution = removeCount;

                let remainingExcessStudentsCount = excessStudents;

                alternativePaths.forEach((alternativePath) => {
                    alternativePath.valueForTestingStudentDistribution +=
                        remainingExcessStudentsCount;
                    remainingExcessStudentsCount = 0;
                });

                excessStudents = remainingExcessStudentsCount;
            });
        }
    });

    currentIterationCount++;
    if (currentIterationCount > MAX_ITERATIONS) {
        failed = true;
    } else {
        checkForExceedingGroupCapacities(paths, items);
    }
    return failed;
}

export { distributeStudentsToPaths };
