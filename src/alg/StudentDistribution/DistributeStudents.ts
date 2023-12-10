import Item from '../../types/Item';
import Group from '../../types/Group';
import Project from '../../types/Project';

function distributeStudentsToPaths(
    items: Item[],
    groups: Group[],
    project: Project
) {
    setGroupsWithOnePath(groups, items);
    const changableGroups = groups.filter((group) => group.paths.length > 1);
    let relevantItems = findRelevantItems(items, changableGroups);

    relevantItems = filterOutItemsWithoutCapacityProblems(
        relevantItems,
        amountRelevantStudents(changableGroups)
    );
    return distributeWithMinimumCapacity(
        changableGroups,
        relevantItems,
        project
    );
}

function distributeWithMinimumCapacity(
    changableGroups: Group[],
    relevantItems: Item[],
    project: Project
) {
    let working = true;
    changableGroups.forEach((group) => {
        let amountStudents = group.studentIds.length;
        group.paths.forEach((path) => {
            const minCapacity = Math.min(
                ...path.path.map((pathItem) => pathItem.updatedGroupCapacity),
                group.studentIds.length
            );
            path.valueForTestingStudentDistribution = minCapacity;
            amountStudents -= minCapacity;
            relevantItems.forEach((item) => {
                if (path.path.includes(item)) {
                    item.updatedGroupCapacity -= minCapacity;
                }
            });
        });

        if (amountStudents > 0) {
            working = false;
            project.failed = true;
            project.reasonForFailing = 'Students left after distribution done';
        }
    });
    return working;
}

function amountRelevantStudents(changableGroups: Group[]) {
    return changableGroups.reduce(
        (total, group) => total + group.studentIds.length,
        0
    );
}

function findRelevantItems(items: Item[], changableGroups: Group[]): Item[] {
    return items.filter((item) => {
        let counter = 0;
        changableGroups.forEach((group) => {
            group.paths.forEach((path) => {
                if (path.path.includes(item)) {
                    counter++;
                }
            });
        });
        return counter > 0;
    });
}

function filterOutItemsWithoutCapacityProblems(
    relevantItems: Item[],
    amountRelevantStudents: number
) {
    return relevantItems.filter(
        (item) => item.updatedGroupCapacity < amountRelevantStudents
    );
}

function setGroupsWithOnePath(groups: Group[], items: Item[]) {
    groups.forEach((group) => {
        if (group.paths.length === 1) {
            group.paths[0].valueForTestingStudentDistribution =
                group.studentIds.length;
            items.forEach((item) => {
                if (group.paths[0].path.includes(item)) {
                    item.updatedGroupCapacity -= group.studentIds.length;
                }
            });
        }
    });
}

export { distributeStudentsToPaths };
