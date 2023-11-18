# Berlin Project

Distributing Students to Their Paths in a Timetable

## Introduction
During our school trip to Berlin, my teacher jokingly suggested creating a Berlin app to distribute students to multiple paths. The idea evolved to include displaying each student's schedule on a website.

## Algorithm History
1. In each approach, the initial step involved building a graph. Here's a brief overview:
2. DFS for Each Student: Applied a depth-first search for each student to optimize path exploration and assignment.
3. Priority Queue: Introduced a priority queue for students, giving preference to those with more individualized elements.
4. Find All Paths: Explored all paths and attempted to distribute students accordingly, followed by allocation based on these numbers.
5. Path Filtering: Enhanced efficiency by filtering out unnecessary data during the distribution process.
6. Maxflow Graphs: Attempted to use maxflow graphs to distribute students to each path, but this solution proved challenging.
7. Prioritizing Roommates: Augmented the algorithm by prioritizing roommates in the allocation proccess, when they made the same choices.

## Commands

### Installation

Run the following command to install the project dependencies:

```bash
npm install
```

### Testing

Execute the following command to run tests:

```bash
npm test
```

### Build

To build the project, use:

```bash
npm run build
```

### Start

To start the project, use:

```bash
npm start
```
