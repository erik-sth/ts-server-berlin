import { DirectedGraph, GraphNode } from "../../Class/Graph";
import Item from "../../types/Item";

// O(n^2)
function createGraph(items: Item[]): DirectedGraph<Item> {
  const G = new DirectedGraph<Item>();
  items.forEach((element) => {
    G.addNode(element);
  });
  G.nodes.forEach((node) => {
    const NEXT_AVAILABLE_EVENT = getNextAvailableEventIds(
      node.value.endTime,
      items
    );
    // logGraphRelations(node, NEXT_AVAILABLE_EVENT); // for "visualizing" the graph

    if (NEXT_AVAILABLE_EVENT.length === 0) return;

    NEXT_AVAILABLE_EVENT.forEach((element) => {
      const NODE_B = G.getNode(element);
      if (NODE_B) G.addEdge(node, NODE_B);
    });
  });
  return G;
}

function logGraphRelations(
  node: GraphNode<Item>,
  NEXT_AVAILABLE_EVENT: Item[]
) {
  console.log("\n" + node.value._id + ": ");
  NEXT_AVAILABLE_EVENT.forEach((item) => console.log(item._id));
}

// O(n)
function getNextAvailableEventIds(
  CURRENT_ITEM_END_TIME: Date,
  ITEMS: Item[]
): Item[] {
  const MAX_TIME_DIFFERENCE_MS = 6 * 60 * 60 * 1000; // 5 hours in milliseconds
  const THIRTY_MINUTES_LATER_TIME = new Date(CURRENT_ITEM_END_TIME);
  THIRTY_MINUTES_LATER_TIME.setMinutes(
    THIRTY_MINUTES_LATER_TIME.getMinutes() + 30
  );

  // Filter items to find events that meet the criteria
  const NEXT_EVENTS = ITEMS.filter((item) => {
    // Calculate the time difference between the current item's end time and the event's start time
    const TIME_DIFFERENCE_MS =
      item.startTime.getTime() - CURRENT_ITEM_END_TIME.getTime();

    // Check if the event starts at least 30 minutes after the current item's end time
    // and doesn't start more than 6 hours after, except when it's on the next day
    return (
      TIME_DIFFERENCE_MS >= 30 * 60 * 1000 && // 30 minutes in milliseconds
      (TIME_DIFFERENCE_MS <= MAX_TIME_DIFFERENCE_MS ||
        isNextDay(CURRENT_ITEM_END_TIME, item.startTime))
    );
  });

  return NEXT_EVENTS;
}

// O(1)
function isNextDay(DATE1: Date, DATE2: Date): boolean {
  const DAY_DIFF = DATE2.getDate() - DATE1.getDate();
  const MONTH_DIFF = DATE2.getMonth() - DATE1.getMonth();
  const YEAR_DIFF = DATE2.getFullYear() - DATE1.getFullYear();

  // Check if the second date is one day ahead of the first date
  return YEAR_DIFF === 0 && MONTH_DIFF === 0 && DAY_DIFF === 1;
}

export default createGraph;
