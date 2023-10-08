import { DirectedGraph, GraphNode } from "../Class/Graph";
import Project from "../types/Project";
import Student from "../types/Student";
import Item from "../types/Item";
import PollQuestion from "../types/Polls";
import createGraph from "./CreateGraph";
import { Group, Groups } from "../Class/Groups";
import { PriorityQueue } from "../Class/PriorityQueue";

const extraIdsCache = new Map<string, string[]>();

let items: Item[] = [];
let students: Student[] = [];
let polls: PollQuestion[] = [];
let project: Project = {} as Project;
let g: DirectedGraph<Item>;
let paths: Path[] = [];
interface Path {
  groupId: number;
  path: string[];
  maxSize: number;
  valueForDistrbutingOfStudents: number;
}

//O(1)
function getRequiredIdsForEveryone(): string[] {
  return project.requiredForAll;
}
//O(m*n) m = amount of polls n = amount of choiches
function getExtraIds(studentId: string): string[] {
  if (extraIdsCache.has(studentId)) {
    return extraIdsCache.get(studentId)!;
  }

  const relevantPolls = polls.filter((poll) =>
    poll.choices.some(
      (choice) => choice.studentIds.includes(studentId) && choice.eventId !== ""
    )
  );

  const ids: string[] = relevantPolls.flatMap((poll) =>
    poll.choices
      .filter(
        (choice) =>
          choice.studentIds.includes(studentId) && choice.eventId !== ""
      )
      .map((choice) => choice.eventId)
  );

  extraIdsCache.set(studentId, ids);
  return ids;
}

function dfs(
  node: GraphNode<Item>,
  remainingIds: Set<string>,
  path: string[],
  extraIds: string[], // which ids are separate from the others
  groupId: number
): string[] | null {
  const requiredIdsCopy = new Set(remainingIds);

  if (!requiredIdsCopy.has(node.value.eventId)) {
    return null;
  }

  const newPath = [...path, node.value._id]; // create a new array instead of mutating
  remainingIds.delete(node.value.eventId);

  if (remainingIds.size === 0) {
    paths.push({
      groupId,
      path: newPath,
      maxSize: getSmallestGroupSize(newPath),
      valueForDistrbutingOfStudents: 0,
    });
  } else if (node.edges !== null) {
    node.edges.forEach((edge) =>
      dfs(edge, remainingIds, newPath, extraIds, groupId)
    );
  }

  remainingIds.add(node.value.eventId);
  return null;
}
function getSmallesGroupSize(path: string[]): number {
  let smallest = Infinity;
  items.forEach((item) => {
    if (path.includes(item._id)) {
      smallest = Math.min(smallest, item.groupSize);
    }
  });
  return smallest;
}
function getSmallestGroupSize(path: string[]): number {
  return Math.min(
    ...items
      .filter((item) => path.includes(item._id))
      .map((item) => item.groupSize)
  );
}
function buildGroupsWithSamePaths() {
  const groups = new Groups();
  students.forEach((student) => {
    groups.add(getExtraIds(student._id), student._id);
  });
  return groups.getAll();
}

function findAllPathsForEachGroup(groups: Group[]) {
  const requiredIds: Set<string> = new Set<string>(getRequiredIdsForEveryone());
  const entries = g.getNodesWithoutIngoingEdges();
  groups.forEach((group) => {
    const ids: Set<string> = new Set([...requiredIds, ...group.path]);
    entries.forEach((entry) => {
      dfs(entry, ids, [], group.path, group.id);
    });
  });
}

function distributeStudentsToPaths(pq: PriorityQueue<Group>): void {
  while (!pq.isEmpty()) {
    const group = pq.dequeue();
    let amountStudentsRemaining = group.studentIds.length;
    paths.forEach((path) => {
      if (path.groupId === group.id && amountStudentsRemaining > 0) {
        const min = Math.min(
          path.maxSize - path.valueForDistrbutingOfStudents,
          amountStudentsRemaining
        );
        amountStudentsRemaining -= min;
        path.valueForDistrbutingOfStudents
          ? (path.valueForDistrbutingOfStudents = min)
          : (path.valueForDistrbutingOfStudents += min);
      }
    });
  }

  checkForDuplicates(paths, items);
}
function redistribute(
  failedId: string,
  excessStudents: number,
  record: Record<string, number>
) {
  // paths.forEach(pathItem =>{
  //   if(!pathItem.path.includes(failedId)){

  //   }
  // })
  paths.forEach((path) => {
    const ausweichIds: Path[] = [];
    const failedPaths: Path[] = [];
    paths.forEach((pathItem) => {
      if (pathItem.groupId === path.groupId) {
        if (!pathItem.path.includes(failedId)) {
          ausweichIds.push(pathItem);
        } else failedPaths.push(pathItem);
      }
    });

    if (failedPaths.length !== 0) {
      // failedPaths.sort(({})=>)
      for (let i = 0; i < failedPaths.length; i++) {
        const removeCount =
          failedPaths[i].valueForDistrbutingOfStudents - excessStudents;

        failedPaths[i].valueForDistrbutingOfStudents = removeCount;
        let j = 0;
        while (excessStudents > 0) {
          ausweichIds[j].valueForDistrbutingOfStudents += excessStudents;
          excessStudents -= excessStudents;
        }
      }
    }
  });

  //find every path with item id
  //find a group with the most extra paths that are not related with this and the most open places

  checkForDuplicates(paths, items);
}

function allocateItemsToStudents(
  paths: Path[],
  items: Item[],
  groups: Group[]
): void {
  paths.forEach((path) => {
    if (path.valueForDistrbutingOfStudents !== 0) {
      const groupId = path.groupId;
      const studentsCount = path.valueForDistrbutingOfStudents;

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
function createRecord(paths: Path[]): Record<string, number> {
  const record: Record<string, number> = {};
  paths.forEach((path) => {
    path.path.forEach((pathItem) => {
      record[pathItem] =
        (record[pathItem] || 0) + path.valueForDistrbutingOfStudents;
    });
  });
  return record;
}

function checkForDuplicates(paths: Path[], items: Item[]) {
  const record: Record<string, number> = createRecord(paths);
  items.forEach((item) => {
    if (record[item._id] > item.groupSize) {
      redistribute(item._id, record[item._id] - item.groupSize, record);
    }
  });
}

function countPathsByGroupId(paths: Path[]): Record<number, number> {
  const countByGroupId: Record<number, number> = {};

  paths.forEach((path) => {
    const groupId = path.groupId;

    if (countByGroupId[groupId]) {
      countByGroupId[groupId]++;
    } else {
      countByGroupId[groupId] = 1;
    }
  });

  return countByGroupId;
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
// O(N^2 * M) estimated
function main(
  items1: Item[],
  students1: Student[],
  project1: Project,
  polls1: PollQuestion[]
): Item[] {
  items = items1;
  students = students1;
  project = project1;
  polls = polls1;
  paths = [];
  const groups = buildGroupsWithSamePaths();
  g = createGraph(items);
  findAllPathsForEachGroup(groups);
  const pq = createPQ(groups);
  distributeStudentsToPaths(pq);
  allocateItemsToStudents(paths, items, groups);
  return items1;
}

export { main, getExtraIds, getRequiredIdsForEveryone, findItemsByStudentId };
