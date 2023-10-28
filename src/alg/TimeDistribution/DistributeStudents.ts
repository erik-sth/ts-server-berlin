import { PriorityQueue } from '../../Class/PriorityQueue';
import Group from '../../types/Group';
import Item from '../../types/Item';
import { getMaxAvailableCapacity } from './FindPaths';

const MAX_ITERATIONS = 2000;
let currentIterationCount = 0;
let failed = false;

function createRecordOfCurrentUsedCapacity(
    groups: Group[]
): Record<string, number> {
    const record: Record<string, number> = {};
    groups.forEach((group) => {
        group.paths.forEach((path) => {
            path.path.forEach((pathItem) => {
                record[pathItem._id] =
                    (record[pathItem._id] || 0) +
                    path.valueForTestingStudentDistribution;
            });
        });
    });
    return record;
}

function distributeStudentsToPaths(
    pq: PriorityQueue<Group>,
    items: Item[],
    groups: Group[]
): void {
    while (!pq.isEmpty()) {
        const group = pq.dequeue();
        let amountStudentsRemaining = group.studentIds.length;

        group.paths.forEach((path) => {
            const min = Math.min(
                getMaxAvailableCapacity(path.path) -
                    path.valueForTestingStudentDistribution,
                amountStudentsRemaining
            );
            amountStudentsRemaining -= min;
            path.valueForTestingStudentDistribution
                ? (path.valueForTestingStudentDistribution = min)
                : (path.valueForTestingStudentDistribution += min);
        });
    }

    checkForExceedingGroupCapacities(groups, items);
}

function checkForExceedingGroupCapacities(
    groups: Group[],
    items: Item[]
): void {
    const record = createRecordOfCurrentUsedCapacity(groups);
    items.forEach((item) => {
        if (record[item._id] > item.groupCapazity) {
            redistribute(
                item,
                record[item._id] - item.groupCapazity,
                items,
                groups
            );
        }
    });
}
function redistribute(
    failedId: Item,
    excessStudents: number,
    items: Item[],
    groups: Group[]
): boolean {
    groups.forEach((group) => {
        const alternativePaths = group.paths.filter(
            (pathItem) => !pathItem.path.includes(failedId)
        );

        const failedGroupPaths = group.paths.filter((pathItem) =>
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
        checkForExceedingGroupCapacities(groups, items);
    }
    return failed;
}

export { distributeStudentsToPaths };
