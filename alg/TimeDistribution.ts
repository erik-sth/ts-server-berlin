import { DirectedGraph, GraphNode } from "../Class/Graph";
import Project from "../types/Project";
import Student from "../types/Student";
import Item from "../types/Item";
import PollQuestion from "../types/Polls";

import createGraph from "./TimeDistribution/CreateGraph";
import { Group, Groups } from "../Class/Groups";
import { PriorityQueue } from "../Class/PriorityQueue";
import { Path } from "../types/Path";
import { findPathsForEachGroup } from "./TimeDistribution/FindPaths";
import { distributeGroupsToPaths } from "./TimeDistribution/DistributeGroups";
import { allocateGroupsToItems } from "./TimeDistribution/AllocateGroupsToItems";
import { getVotingIds } from "./TimeDistribution/Utils";

function buildGroupsWithSamePaths(
  polls: PollQuestion[],
  students: Student[]
): Group[] {
  const groups = new Groups();
  students.forEach((student) => {
    groups.add(getVotingIds(student._id, polls), student._id);
  });
  return groups.getAll();
}

function createPQ(groups: Group[]): PriorityQueue<Group> {
  const pq = new PriorityQueue<Group>();
  groups.forEach((group) => {
    pq.enqueue(group, group.path.length);
  });
  return pq;
}

function main(
  items: Item[],
  students: Student[],
  project: Project,
  polls: PollQuestion[]
): Item[] {
  const groups = buildGroupsWithSamePaths(polls, students);
  const g = createGraph(items);
  const paths: Path[] = findPathsForEachGroup(groups, items, g, project);
  const pq: PriorityQueue<Group> = createPQ(groups);
  distributeGroupsToPaths(pq, items, paths);

  allocateGroupsToItems(paths, items, groups);

  return items;
}

export { main, getVotingIds };
