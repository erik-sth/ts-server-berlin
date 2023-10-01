import { PriorityQueue } from "../Class/PriorityQueue";
import { DirectedGraph, GraphNode } from "../Class/Graph";
import Project from "../types/Project";
import Student from "../types/Student";
import Item from "../types/Item";
import PollQuestion from "../types/Polls";

const extraIdsCache = new Map<string, string[]>();

let items: Item[] = [];
let students: Student[] = [];
let polls: PollQuestion[] = [];
let project: Project = {} as Project;
let pq: PriorityQueue<Student>;
let g: DirectedGraph<Item>;

//O(n^2)
function createGraph(): DirectedGraph<Item> {
  const g = new DirectedGraph<Item>();
  items.forEach((element) => {
    g.addNode(element);
  });
  g.nodes.forEach((node) => {
    const nextAvailableEvent = getNextAvailableEventIds(
      node.value.endTime,
      items
    );
    // logGraphRelations(node, nextAvailableEvent); //for "visualizing" the graph

    if (nextAvailableEvent.length === 0) return;

    nextAvailableEvent.forEach((element) => {
      const nodeB = g.getNode(element);
      if (nodeB) g.addEdge(node, nodeB);
    });
  });
  return g;
}
function logGraphRelations(node: GraphNode<Item>, nextAvailableEvent: Item[]) {
  console.log("\n" + node.value._id + ": ");
  nextAvailableEvent.forEach((item) => console.log(item._id));
}
//O(n)
function getNextAvailableEventIds(
  currentItemEndTime: Date,
  items: Item[]
): Item[] {
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
//O(1)
function isNextDay(date1: Date, date2: Date): boolean {
  const dayDiff = date2.getDate() - date1.getDate();
  const monthDiff = date2.getMonth() - date1.getMonth();
  const yearDiff = date2.getFullYear() - date1.getFullYear();

  // Check if the second date is one day ahead of the first date
  return yearDiff === 0 && monthDiff === 0 && dayDiff === 1;
}
//O(N*M)
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
        const path = dfs(
          entry,
          ids,
          [],
          student._id,
          students.length * 2,
          extraIds
        );
        if (path !== null) {
          stop = true;
        }
      }
    });
  }
}
//O(1)
function getRequiredIdsForEveryone(): string[] {
  return project.requiredForAll;
}
//O(m*n)
function getExtraIds(studentId: string): string[] {
  // Check if the result is cached
  if (extraIdsCache.has(studentId)) {
    return extraIdsCache.get(studentId)!;
  }

  // Filter relevant polls based on studentId
  const relevantPolls = polls.filter((poll) =>
    poll.choices.some(
      (choice) => choice.studentIds.includes(studentId) && choice.eventId !== ""
    )
  );

  // Extract eventIds from relevant choices
  const ids: string[] = relevantPolls.reduce((result, poll) => {
    const relevantChoices = poll.choices.filter(
      (choice) => choice.studentIds.includes(studentId) && choice.eventId !== ""
    );
    result.push(...relevantChoices.map((choice) => choice.eventId));
    return result;
  }, [] as string[]);

  // Cache the result
  extraIdsCache.set(studentId, ids);

  return ids;
}
//O(N)
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
    } else break;
  }

  allocatePathToStudents(students, path);
}

function allocatePathToStudents(studentIds: string[], path: string[]): void {
  const itemMap: Record<string, Item> = {};

  // Create a map for efficient item lookup
  items.forEach((item) => {
    itemMap[item._id] = item;
  });

  path.forEach((itemId) => {
    const item = itemMap[itemId];
    if (item) {
      item.studentIds.push(...studentIds);
    }
  });
}
// O(N)
function dfs(
  node: GraphNode<Item>,
  remainingIds: Set<string>,
  path: string[],
  studentId: string,
  minExtraCourseSize: number,
  extraIds: string[] //which ids are seperate from the others
): string[] | null {
  // Create a copy of the requiredIds set to ensure it's independent for this branch
  const requiredIdsCopy = new Set(remainingIds);

  const students = node.value.studentIds.length;
  const groupSize = node.value.groupSize;
  const amountOfExtraOpenSlots = groupSize - students - 1;
  if (!requiredIdsCopy.has(node.value.eventId) || amountOfExtraOpenSlots < 1) {
    return null;
  }
  const smallerNumber = Math.min(minExtraCourseSize, amountOfExtraOpenSlots);

  path.push(node.value._id);

  remainingIds.delete(node.value.eventId);

  if (remainingIds.size === 0) {
    addPersonsWithSameIds(studentId, extraIds, smallerNumber, pq, path);
    return path; // Return the path when it's complete
  } else if (node.edges !== null) {
    for (let i = 0; i < node.edges.length; i++) {
      const newPath = dfs(
        node.edges[i],
        remainingIds, // Use the copied set
        path, // Use the copied path
        studentId,
        smallerNumber, // Pass the object containing minExtraCourseSize
        extraIds
      );
      if (newPath !== null) return newPath;
    }
  }
  remainingIds.add(node.value.eventId);
  path.pop();
  return null; // Return null when no valid path is found
}

//O(N * log(N));
function createPQ(): PriorityQueue<Student> {
  const pq = new PriorityQueue<Student>();
  students.forEach((student) => {
    const extraIds = getExtraIds(student._id);
    pq.enqueue(student, extraIds.length);
  });
  return pq;
}

function arraysHaveSameValues(arr1: any[], arr2: any[]): boolean {
  if (arr1.length !== arr2.length) {
    return false; // If the lengths are different, they can't have the same values
  }

  const set1 = new Set(arr1);
  for (const value of arr2) {
    if (!set1.has(value)) {
      return false; // If a value in arr2 is not in arr1, they are not the same
    }
  }

  return true; // All values in arr2 are also in arr1
}

function findItemsByStudentId(studentId: string, items: Item[]): Item[] {
  return items.filter((item) => item.studentIds.includes(studentId));
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

  pq = createPQ();
  g = createGraph();
  allocateItemsToStudents();
  return items1;
}

export { main, findItemsByStudentId, getExtraIds, getRequiredIdsForEveryone };
