import Item from '../../types/Item';
import Group from '../../types/Group';
import Project from '../../types/Project';

function distributeStudentsToPaths(
    items: Item[],
    groups: Group[],
    project: Project
): void {
    setGroupsWithOnePath(groups, items);
    const changableGroups = groups.filter((group) => group.paths.length > 1);

    const groupsDistribution: {
        groupId: number;
        distributedStudentsPerPath: number[];
        validDistributionNumbers: number[][];
        amountToDistribute: number;
        remainingToDistribute: number;
    }[] = [];

    changableGroups.forEach((g) => {
        groupsDistribution.push({
            groupId: g._id,
            amountToDistribute: g.studentIds.length,
            remainingToDistribute: g.studentIds.length,
            distributedStudentsPerPath: Array(g.paths.length).fill(0),
            validDistributionNumbers: [],
        });
    });

    let validFound = false;

    changableGroups.forEach((g, index) => {
        distributeItems(
            0,
            g.studentIds.length,
            new Array(g.paths.length).fill(0),
            groupsDistribution[index].validDistributionNumbers,
            g
        );
    });

    if (!validFound) {
        distributeStudentsToPath(0, 0);
    }

    // Recursive function to distribute items
    function distributeItems(
        currentIndex: number,
        remainingItems: number,
        currentDistribution: number[],
        validDistributionNumbers: number[][],
        group: Group
    ): void {
        if (validFound) {
            return;
        }

        if (currentIndex === currentDistribution.length - 1) {
            currentDistribution[currentIndex] = remainingItems;

            group.paths.forEach((p, index) => {
                p.testValueForDistributingStudents = currentDistribution[index];
            });

            if (isValid(groups)) {
                validDistributionNumbers.push([...currentDistribution]);
            } else {
                group.paths.forEach((p) => {
                    p.testValueForDistributingStudents = 0;
                });
            }
        } else {
            for (let i: number = 0; i <= remainingItems; i++) {
                currentDistribution[currentIndex] = i;
                distributeItems(
                    currentIndex + 1,
                    remainingItems - i,
                    currentDistribution,
                    validDistributionNumbers,
                    group
                );
            }
        }
    }

    // Function to distribute students to paths recursively
    function distributeStudentsToPath(
        currentIndex: number,
        groupIndex: number
    ): void {
        if (validFound || groupIndex >= changableGroups.length) {
            project.failedCalculating = true;
            return;
        }

        const group = groupsDistribution[groupIndex];

        if (currentIndex >= group.validDistributionNumbers.length) {
            distributeStudentsToPath(0, groupIndex + 1);
            return;
        }

        group.validDistributionNumbers[currentIndex].forEach(
            (distributionNumber, index) => {
                changableGroups[groupIndex].paths[
                    index
                ].testValueForDistributingStudents = distributionNumber;
            }
        );

        if (isValid(groups)) {
            console.log('new result');
            groups.forEach((g) => {
                const nums: number[] = [];
                g.paths.forEach((p) => {
                    nums.push(p.testValueForDistributingStudents);
                });
                console.log(`groupid: ${g._id}, pathDistribution: ${nums}`);
            });
            validFound = true;
            return;
        }

        distributeStudentsToPath(currentIndex + 1, groupIndex);
    }
}

function isValid(groups: Group[]): boolean {
    const mapOfUsedCapacityPerItem: Map<Item, number> = new Map();
    let isValidDistribution = true;

    groups.forEach((g) => {
        g.paths.forEach((path) => {
            path.itemsInPath.forEach((item) => {
                const itemMap = mapOfUsedCapacityPerItem.get(item) || 0;
                mapOfUsedCapacityPerItem.set(
                    item,
                    itemMap + path.testValueForDistributingStudents
                );

                if (
                    item.studentCapacity < mapOfUsedCapacityPerItem.get(item)!
                ) {
                    isValidDistribution = false;
                }
            });
        });
    });

    return isValidDistribution;
}

function setGroupsWithOnePath(groups: Group[], items: Item[]): void {
    groups.forEach((group) => {
        if (group.paths.length === 1) {
            group.paths[0].testValueForDistributingStudents =
                group.studentIds.length;
            items.forEach((item) => {
                if (group.paths[0].itemsInPath.includes(item)) {
                    item.remainingCapacity -= group.studentIds.length;
                }
            });
        }
    });
}

export { distributeStudentsToPaths };
