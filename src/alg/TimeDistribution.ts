import { Group, Groups } from "../Class/Groups";
import { PriorityQueue } from "../Class/PriorityQueue";
import PollQuestion from "../types/Polls";
import Student from "../types/Student";
import createGraph from "./TimeDistribution/CreateGraph";
import { distributeGroupsToPaths } from "./TimeDistribution/DistributeGroups";
import { findPathsForEachGroup } from "./TimeDistribution/FindPaths";
import { getVotingIds } from "./TimeDistribution/Utils";
import { allocateGroupsToItems } from "./TimeDistribution/AllocateGroupsToItems";
import Item from "../types/Item";
import Project from "../types/Project";
import { Path } from "../types/Path";

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
