import { PriorityQueue } from "../Class/ClassPriorityQueue";
import { DirectedGraph, GraphNode } from "../Class/Graph";
import { Item } from "../data/Items";
import { PollQuestion } from "../data/Polls";
import { Project } from "../data/Project";
import { Student } from "../data/students";

interface Test {
  id: number;
  path: string[];
  students: string[];
}

const extraIdsCache = new Map<string, string[]>();

let items: Item[] = [];
let students: Student[] = [];
let polls: PollQuestion[] = [];
let project: Project = {} as Project;
let pq: PriorityQueue<Student>;
let g: DirectedGraph<Item>;

function createGraph(): DirectedGraph<Item> {
  const graph = new DirectedGraph<Item>();
  items.forEach((element) => {
    graph.addNode(element);
  });
  graph.nodes.forEach((node) => {
    const nextAvailableEvent = nextAvailableEvents(node.value.endTime, items);
    // logGraphRelations(node, nextAvailableEvent); // For "visualizing" the graph

    if (nextAvailableEvent.length === 0) return;

    nextAvailableEvent.forEach((element) => {
      const index = graph.nodes.findIndex((n) => n.value._id === element._id);
      graph.addEdge(node, graph.nodes[index]);
    });
  });
  return graph;
}

function nextAvailableEvents(currentItemEndTime: Date, items: Item[]): Item[] {
  const maxTimeDifferenceMs = 6 * 60 * 60 * 1000; // 5 hours in milliseconds
  const thirtyMinutesLaterTime = new Date(currentItemEndTime);
  thirtyMinutesLaterTime.setMinutes(thirtyMinutesLaterTime.getMinutes() + 30);

  // Filter items to find events that meet the criteria
  const nextEvents = items.filter((item) => {
    // Calculate the time difference between the current item's end time and the event's start time
    const timeDifferenceMs =
      item.startTime.getTime() - currentItemEndTime.getTime();

    // Check if the event starts at least 30 minutes after the current item's end time
    // and doesn't start more than 6 hours after, except when it's on the next day
    return (
      timeDifferenceMs >= 30 * 60 * 1000 && // 30 minutes in milliseconds
      (timeDifferenceMs <= maxTimeDifferenceMs ||
        isNextDay(currentItemEndTime, item.startTime))
    );
  });

  return nextEvents;
}

function isNextDay(date1: Date, date2: Date): boolean {
  return (
    date2.getDate() === date1.getDate() + 1 &&
    date2.getMonth() === date1.getMonth() &&
    date2.getFullYear() === date1.getFullYear()
  );
}

function allocateItemsToStudents() {
  const requiredIds: Set<string> = new Set<string>(getRequiredIdsForEveryone());
  const entries = g.getNodesWithoutIngoingEdges();

  while (!pq.isEmpty()) {
    const student = pq.dequeue();
    if (!student) return;
    const extraIds = getExtraIds(student._id);
    const ids: Set<string> = new Set([...requiredIds, ...extraIds]);

    let stop = false;

    entries.forEach((entry) => {
      if (!stop) {
        const path = dfs(entry, entry.edges, ids, [], student._id, Infinity);
        if (path !== null) {
          stop = true;
        }
      }
    });
  }
}

function getRequiredIdsForEveryone(): string[] {
  return project.requiredForAll;
}

function getExtraIds(studentId: string): string[] {
  // Check if the result is cached
  if (extraIdsCache.has(studentId)) {
    return extraIdsCache.get(studentId)!;
  }

  // Perform the computation as usual
  const ids: string[] = [];
  polls.forEach((poll) => {
    poll.choices.forEach((choice) => {
      if (choice.eventId !== "" && choice.studentIds.includes(studentId)) {
        ids.push(choice.eventId);
      }
    });
  });

  // Cache the result
  extraIdsCache.set(studentId, ids);

  return ids;
}

function addPersonsWithSameIds(
  studentId: string,
  extraIds: string[],
  minExtraCourseSize: number,
  pq: PriorityQueue<Student>,
  path: string[]
) {
  const students: string[] = [studentId];

  for (let i = 0; i < minExtraCourseSize; i++) {
    if (pq.isEmpty()) continue;
    const comparisonStudent = pq.peek();
    const comparisonIds = getExtraIds(comparisonStudent!._id);
    if (arraysHaveSameValues(comparisonIds, extraIds)) {
      students.push(comparisonStudent!._id);
      pq.dequeue();
      continue;
    }
  }

  allocatePathToStudents(students, path);
}

function allocatePathToStudents(studentIds: string[], path: string[]): void {
  path.forEach((item) => {
    const index = items.findIndex((event) => event._id === item);
    items[index].studentIds.push(...studentIds);
  });
}

function dfs(
  node: GraphNode<Item>,
  edges: GraphNode<Item>[],
  requiredIds: Set<string>,
  path: string[],
  studentId: string,
  minExtraCourseSize: number
): string[] | null {
  const students = node.value.studentIds.length;
  const groupSize = node.value.groupSize;
  const amountOfOpenSlots = groupSize - students + 1;
  if (!requiredIds.has(node.value.eventId) || groupSize < students + 1)
    return null;

  if (minExtraCourseSize > amountOfOpenSlots)
    minExtraCourseSize = amountOfOpenSlots;

  requiredIds.delete(node.value.eventId);
  path.push(node.value._id);

  if (requiredIds.size === 0) {
    const extraIds = getExtraIds(studentId);
    addPersonsWithSameIds(studentId, extraIds, minExtraCourseSize, pq, path);
    return path; // Return the path when it's complete
  } else if (edges !== null) {
    for (let i = 0; i < edges.length; i++) {
      const newPath = dfs(
        edges[i],
        edges[i].edges,
        requiredIds,
        path,
        studentId,
        minExtraCourseSize
      );
      if (newPath !== null) return newPath;
    }
  }
  return null; // Return null when no valid path is found
}

function createPQ(): PriorityQueue<Student> {
  const pq = new PriorityQueue<Student>();
  students.forEach((student) => {
    const extraIds = getExtraIds(student._id);
    pq.enqueue(student, extraIds.length);
  });
  return pq;
}

function arraysHaveSameValues(arr1: any[], arr2: any[]): boolean {
  return (
    arr1.length === arr2.length &&
    arr1.every((value) => arr2.includes(value)) &&
    arr2.every((value) => arr1.includes(value))
  );
}

function findItemsByStudentId(studentId: string, items: Item[]): Item[] {
  return items.filter((item) => item.studentIds.includes(studentId));
}

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

  pq = createPQ();
  g = createGraph();
  allocateItemsToStudents();
  return items1;
}

export { main, findItemsByStudentId };
