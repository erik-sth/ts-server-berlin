import { DirectedGraph } from '../../Class/Graph';
import Item from '../../types/Item';
import Project from '../../types/Project';

const MAX_TIME_DIFFERENCE_MS = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

function createGraph(items: Item[], project: Project): DirectedGraph<Item> {
    const G = new DirectedGraph<Item>();
    items.forEach((element) => {
        G.addNode(element);
    });
    G.nodes.forEach((node) => {
        const nextAvailableEvent = getNextAvailableEventIds(
            node.value.endTime,
            items
        );

        if (nextAvailableEvent.length === 0) return;

        nextAvailableEvent.forEach((element) => {
            const nodeB = G.getNode(element);
            if (nodeB) G.addEdge(node, nodeB);
        });
    });
    if (G.sizeEdges() === 0) {
        project.failedCalculating = true;
        project.reasonForFailing = 'Graph build failed: ZeroEdges';
    }
    return G;
}

function getNextAvailableEventIds(
    currentItemEndTime: Date,
    items: Item[]
): Item[] {
    const THIRTY_MINUTES_LATER_TIME = new Date(currentItemEndTime);
    THIRTY_MINUTES_LATER_TIME.setMinutes(
        THIRTY_MINUTES_LATER_TIME.getMinutes() + 30
    );

    // Filter items to find events that meet the criteria
    const nextEvents = items.filter((item) => {
        const timeDifferenceMs =
            item.startTime.getTime() - currentItemEndTime.getTime();

        // Check if the event starts at least 30 minutes after the current item's end time
        // and doesn't start more than 6 hours after, except when it's on the next day
        return (
            timeDifferenceMs >= 30 * 60 * 1000 && // 30 minutes in milliseconds
            (timeDifferenceMs <= MAX_TIME_DIFFERENCE_MS ||
                isNextDay(currentItemEndTime, item.startTime))
        );
    });

    return nextEvents;
}

function isNextDay(date1: Date, date2: Date): boolean {
    const dayDiff = date2.getDate() - date1.getDate();
    const monthDiff = date2.getMonth() - date1.getMonth();
    const yearDiff = date2.getFullYear() - date1.getFullYear();

    // Check if the second date is one day ahead of the first date
    return yearDiff === 0 && monthDiff === 0 && dayDiff === 1;
}

export default createGraph;
