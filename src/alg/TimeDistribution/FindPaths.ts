import { DirectedGraph, GraphNode } from "../../Class/Graph";
import { Group } from "../../Class/Groups";
import Item from "../../types/Item";
import { Path } from "../../types/Path";
import Project from "../../types/Project";
import { getDefaultIds } from "./Utils";

function findPathsForEachGroup(
  groups: Group[],
  items: Item[],
  g: DirectedGraph<Item>,
  project: Project
): Path[] {
  const paths: Path[] = [];
  const requiredIds = new Set<string>(getDefaultIds(project));
  const entries = g.getNodesWithoutIngoingEdges();
  groups.forEach((group) => {
    const ids = new Set([...requiredIds, ...group.path]);
    entries.forEach((entry: GraphNode<Item>) => {
      dfs(entry, ids, [], group.path, group._id, items, paths);
    });
  });

  return paths;
}
function dfs(
  node: GraphNode<Item>,
  remainingIds: Set<string>,
  path: string[],
  extraIds: string[],
  groupId: number,
  items: Item[],
  paths: Path[]
): void {
  const requiredIdsCopy = new Set(remainingIds);

  if (!requiredIdsCopy.has(node.value.eventId)) {
    return;
  }

  const newPath = [...path, node.value._id];
  remainingIds.delete(node.value.eventId);

  if (remainingIds.size === 0) {
    paths.push({
      groupId,
      path: newPath,
      groupCapacity: getSmallestAvailableSeats(newPath, items),
      valueForDistributingOfStudents: 0,
    });
  } else if (node.edges !== null) {
    node.edges.forEach((edge) =>
      dfs(edge, remainingIds, newPath, extraIds, groupId, items, paths)
    );
  }

  remainingIds.add(node.value.eventId);
}
function getSmallestAvailableSeats(path: string[], items: Item[]): number {
  return Math.min(
    ...items
      .filter((item) => path.includes(item._id))
      .map((item) => item.groupCapazity)
  );
}
export { findPathsForEachGroup };
