import { DirectedGraph, GraphNode } from "../Class/Graph";
import Project from "../types/Project";
import Student from "../types/Student";
import Item from "../types/Item";
import PollQuestion from "../types/Polls";
import createGraph from "./CreateGraph";
import { Group, Groups } from "../Class/Groups";
import { PriorityQueue } from "../Class/PriorityQueue";
import { Path } from "../types/Path";

const MAX_ITERATIONS = 2000;
const EXTRA_IDS_CACHE = new Map<string, string[]>();
let failed = false;
let students: Student[] = [];
let polls: PollQuestion[] = [];
let project: Project = {} as Project;
let g: DirectedGraph<Item>;
let paths: Path[] = [];
let counter = 0;

function getDefaultIds(): string[] {
  return project.requiredForAll;
}

function getVotingIds(studentId: string): string[] {
  const EMPTY_STRING = "";
  if (EXTRA_IDS_CACHE.has(studentId)) {
    return EXTRA_IDS_CACHE.get(studentId)!;
  }

  const relevantPolls = polls
    .filter((poll) =>
      poll.choices.some(
        (choice) =>
          choice.studentIds.includes(studentId) &&
          choice.eventId !== EMPTY_STRING
      )
    )
    .flatMap((poll) =>
      poll.choices
        .filter(
          (choice) =>
            choice.studentIds.includes(studentId) &&
            choice.eventId !== EMPTY_STRING
        )
        .map((choice) => choice.eventId)
    );

  EXTRA_IDS_CACHE.set(studentId, relevantPolls);
  return relevantPolls;
}

function dfs(
  node: GraphNode<Item>,
  remainingIds: Set<string>,
  path: string[],
  extraIds: string[],
  groupId: number,
  items: Item[]
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
      maxSize: getSmallestAvailableSeats(newPath, items),
      valueForDistributingOfStudents: 0,
    });
  } else if (node.edges !== null) {
    node.edges.forEach((edge) =>
      dfs(edge, remainingIds, newPath, extraIds, groupId, items)
    );
  }

  remainingIds.add(node.value.eventId);
}

function getSmallestAvailableSeats(path: string[], items: Item[]): number {
  return Math.min(
    ...items
      .filter((item) => path.includes(item._id))
      .map((item) => item.groupSize)
  );
}

function buildGroupsWithSamePaths(): Group[] {
  const groups = new Groups();
  students.forEach((student) => {
    groups.add(getVotingIds(student._id), student._id);
  });
  return groups.getAll();
}

function findPathsForEachGroup(groups: Group[], items: Item[]): void {
  const requiredIds = new Set<string>(getDefaultIds());
  const entries = g.getNodesWithoutIngoingEdges();
  groups.forEach((group) => {
    const ids = new Set([...requiredIds, ...group.path]);
    entries.forEach((entry) => {
      dfs(entry, ids, [], group.path, group.id, items);
    });
  });
}

function distributeGroupsToPaths(
  pq: PriorityQueue<Group>,
  items: Item[]
): void {
  while (!pq.isEmpty()) {
    const group = pq.dequeue();
    let amountStudentsRemaining = group.studentIds.length;

    paths.forEach((path) => {
      if (path.groupId === group.id && amountStudentsRemaining > 0) {
        const min = Math.min(
          path.maxSize - path.valueForDistributingOfStudents,
          amountStudentsRemaining
        );

        amountStudentsRemaining -= min;
        path.valueForDistributingOfStudents
          ? (path.valueForDistributingOfStudents = min)
          : (path.valueForDistributingOfStudents += min);
      }
    });
  }

  checkForToBigGroupSizes(paths, items);
}

function redistribute(
  failedId: string,
  excessStudents: number,
  items: Item[]
): void {
  paths.forEach((path) => {
    const alternativePaths = paths.filter(
      (pathItem) =>
        pathItem.groupId === path.groupId && !pathItem.path.includes(failedId)
    );

    const failedGroupPaths = paths.filter(
      (pathItem) =>
        pathItem.groupId === path.groupId && pathItem.path.includes(failedId)
    );

    if (failedGroupPaths.length !== 0 && excessStudents !== 0) {
      failedGroupPaths.sort(
        (a, b) =>
          b.valueForDistributingOfStudents - a.valueForDistributingOfStudents
      );

      failedGroupPaths.forEach((failedPath) => {
        const removeCount =
          failedPath.valueForDistributingOfStudents - excessStudents;
        failedPath.valueForDistributingOfStudents = removeCount;

        let remainingExcessStudentsCount = excessStudents;

        alternativePaths.forEach((alternativePath) => {
          alternativePath.valueForDistributingOfStudents +=
            remainingExcessStudentsCount;
          remainingExcessStudentsCount = 0;
        });

        excessStudents = remainingExcessStudentsCount;
      });
    }
  });

  counter++;
  if (counter > MAX_ITERATIONS) {
    failed = true;
  } else {
    checkForToBigGroupSizes(paths, items);
  }
}

function allocateGroupsToItems(
  paths: Path[],
  items: Item[],
  groups: Group[]
): void {
  paths.forEach((path) => {
    if (path.valueForDistributingOfStudents !== 0) {
      const groupId = path.groupId;
      const studentsCount = path.valueForDistributingOfStudents;

      const group = groups.find((group) => groupId === group.id);

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

function createRecordOfGroupSizes(paths: Path[]): Record<string, number> {
  const record: Record<string, number> = {};
  paths.forEach((path) => {
    path.path.forEach((pathItem) => {
      record[pathItem] =
        (record[pathItem] || 0) + path.valueForDistributingOfStudents;
    });
  });
  return record;
}

function checkForToBigGroupSizes(paths: Path[], items: Item[]): void {
  const record = createRecordOfGroupSizes(paths);
  items.forEach((item) => {
    if (record[item._id] > item.groupSize) {
      redistribute(item._id, record[item._id] - item.groupSize, items);
    }
  });
}

function findItemsByStudentId(studentId: string, items: Item[]): Item[] {
  return items.filter((item) => item.studentIds.includes(studentId));
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
  students1: Student[],
  project1: Project,
  polls1: PollQuestion[]
): Item[] {
  students = students1;
  project = project1;
  polls = polls1;
  paths = [];
  const groups = buildGroupsWithSamePaths();
  g = createGraph(items);
  findPathsForEachGroup(groups, items);
  const pq = createPQ(groups);
  distributeGroupsToPaths(pq, items);

  if (!failed) {
    allocateGroupsToItems(paths, items, groups);
  } else {
    console.log("failed");
  }

  counter = 0;
  return items;
}

export { main, getVotingIds, getDefaultIds, findItemsByStudentId };
