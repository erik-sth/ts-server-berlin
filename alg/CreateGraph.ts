import { DirectedGraph, GraphNode } from "../Class/Graph";
import Item from "../types/Item";

//O(n^2)
function createGraph(items: Item[]): DirectedGraph<Item> {
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

export default createGraph;
