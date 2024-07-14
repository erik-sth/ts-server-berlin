import { DirectedGraph, GraphNode } from '../../Class/Graph';
import { Group } from '../../Class/Groups';
import Item from '../../types/Item';
import Project from '../../types/Project';
import { getRequiredGroupIds } from './Utils';

function findPathsForTheGroups(
    groups: Group[],
    items: Item[],
    g: DirectedGraph<Item>,
    project: Project,
    requiredIds: Set<string> = new Set<string>(getRequiredGroupIds(project))
) {
    const entries = g.getNodesWithIndegreeZero();
    groups.forEach((group) => {
        const ids = new Set([...requiredIds, ...group.requiredEvents]);

        entries.forEach((entry: GraphNode<Item>) => {
            dfs(entry, ids, [], group.requiredEvents, group, items);
        });
        if (group.paths.length == 0) {
            project.failedCalculating = true;
            project.reasonForFailing = 'Zero paths for Group Found';
        }
    });
}

function dfs(
    node: GraphNode<Item>,
    remainingIds: Set<string>,
    path: Item[],
    extraIds: string[],
    group: Group,
    items: Item[]
): void {
    const requiredIdsCopy = new Set(remainingIds);

    if (!requiredIdsCopy.has(node.value.eventId)) {
        return;
    }

    const newPath = [...path, node.value];
    remainingIds.delete(node.value.eventId);

    if (remainingIds.size === 0) {
        group.paths.push({
            itemsInPath: newPath,
            testValueForDistributingStudents: 0,
        });
    } else if (node.edges !== null) {
        node.edges.forEach((edge) =>
            dfs(edge, remainingIds, newPath, extraIds, group, items)
        );
    }

    remainingIds.add(node.value.eventId);
}

function getMaxAvailableCapacity(path: Item[]): number {
    return Math.min(...path.map((item) => item.studentCapacity));
}

export { findPathsForTheGroups, getMaxAvailableCapacity };
