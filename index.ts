import { DirectedGraph, GraphNode } from "./Graph";
import { items, Item } from "./data/Items";
import { students, IStudent } from "./data/students";

function createGraph(items: Item[]): DirectedGraph<Item> {
  const g = new DirectedGraph<Item>();
  items.forEach((element) => {
    g.addNode(element);
  });
  g.nodes.forEach((node) => {
    const nextAvailableEvent = nextAvailableEvents(node.value.endTime, items);
    // logGraphRelations(node, nextAvailableEvent); //for "visualizing" the graph

    if (nextAvailableEvent.length === 0) return;

    nextAvailableEvent.forEach((element) => {
      const index = g.nodes.findIndex((node) => node.value._id === element._id);
      g.addEdge(node, g.nodes[index]);
    });
  });
  return g;
}

function logGraphRelations(node: GraphNode<Item>, nextAvailableEvent: Item[]) {
  console.log("\n" + node.value._id + ": ");
  nextAvailableEvent.forEach((item) => console.log(item._id));
}
function nextAvailableEvents(currentItemEndTime: Date, items: Item[]): Item[] {
  const maxTimeDifferenceMs = 5 * 60 * 60 * 1000; // 5 hours in milliseconds
  const thirtyMinutesLaterTime = new Date(currentItemEndTime);
  thirtyMinutesLaterTime.setMinutes(thirtyMinutesLaterTime.getMinutes() + 30);

  // Filter items to find events that meet the criteria
  const nextEvents = items.filter((item) => {
    // Calculate the time difference between the current item's end time and the event's start time
    const timeDifferenceMs =
      item.startTime.getTime() - currentItemEndTime.getTime();

    // Check if the event starts at least 30 minutes after the current item's end time
    // and doesn't start more than 5 hours after, except when it's on the next day
    return (
      timeDifferenceMs >= 30 * 60 * 1000 && // 30 minutes in milliseconds
      (timeDifferenceMs <= maxTimeDifferenceMs ||
        isNextDay(currentItemEndTime, item.startTime))
    );
  });

  return nextEvents;
}

// Helper function to check if the date is the next day
function isNextDay(date1: Date, date2: Date): boolean {
  return (
    date2.getDate() === date1.getDate() + 1 &&
    date2.getMonth() === date1.getMonth() &&
    date2.getFullYear() === date1.getFullYear()
  );
}

function allocateItemsToStudents(
  graph: DirectedGraph<Item>,
  students: IStudent[]
) {
  let requiredIds = getRequiredIds(items);
  const entries = graph.getNodesWithoutIngoingEdges();
  students.forEach((student) => {
    entries.forEach((entrie) => {
      const path = dfs(entrie, entrie.edges, requiredIds, [], student._id);
      if (path !== null) {
        console.log(`Found a path for ${student._id}:`, path);
        return;
      }
    });
  });
}
function getRequiredIds(items: Item[]): string[] {
  const uniqueIds = new Set<string>();
  items.forEach((item) => uniqueIds.add(item.eventId));
  return Array.from(uniqueIds.values());
}
function studentCanAttend(student: IStudent, event: Event): boolean {
  return false;
}

function allocatePathToStudent(studentId: string, path: string[]): void {
  path.forEach((item) => {
    const index = items.findIndex((event) => event._id === item);
    items[index].studentIds.push(studentId);
  });
}
function dfs(
  node: GraphNode<Item>,
  edges: GraphNode<Item>[],
  requiredIds: string[],
  path: string[],
  studentId: string
): null | string[] {
  if (
    !requiredIds.includes(node.value.eventId) ||
    node.value.groupSize < node.value.studentIds.length + 1
  )
    return null; // Stop exploring if not required

  requiredIds = requiredIds.filter((item) => item !== node.value.eventId);
  path.push(node.value._id);

  if (requiredIds.length === 0) {
    allocatePathToStudent(studentId, path);
    return path; // Return the path when it's complete
  } else if (edges !== null) {
    for (let i = 0; i < edges.length; i++) {
      const newPath = dfs(
        edges[i],
        edges[i].edges,
        requiredIds,
        path.slice(),
        studentId
      );
      if (newPath !== null) {
        return newPath; // Return the first valid path found
      }
    }
  }
  return null; // Return null when no valid path is found
}

function findItemsByStudentId(studentId: string, items: Item[]): Item[] {
  return items.filter(
    (item) => item.studentIds && item.studentIds.includes(studentId)
  );
}
function main(items: Item[], students: IStudent[]): DirectedGraph<Item> {
  const g = createGraph(items);
  allocateItemsToStudents(g, students);
  return g;
}
console.time();
main(items, students);
console.timeEnd();
// findItemsByStudentId("person1", items).forEach((elemement) =>
//   console.log(elemement.title, "test")
// );

export { main };
