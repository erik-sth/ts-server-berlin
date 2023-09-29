Project README
Introduction
This project aims to efficiently allocate items to students based on specific criteria. It leverages a priority queue and a directed graph to optimize the allocation process.

Components
Classes
PriorityQueue: A priority queue implementation used to prioritize students based on the number of extra items they can accommodate.

DirectedGraph: A directed graph implementation used to model relationships between items. Each node represents an item, and edges represent possible connections between items.

GraphNode: Represents a node in the directed graph, corresponding to an item.

Data Structures
Item: Represents an item that students can be allocated to. Contains information such as start time, end time, and a unique identifier.

PollQuestion: Represents a poll question, used to gather information about students' preferences.

Project: Represents the overall project, including items required for all students.

Student: Represents a student, including information about the student and items they are already allocated.

Functions
createGraph(): Builds a directed graph based on the items provided, creating edges between items that have a suitable time gap.

getNextAvailableEventIds(currentItemEndTime, items): Returns a list of items that can be scheduled after the given item's end time.

allocateItemsToStudents(): Allocates items to students using a depth-first search approach, considering required and extra items.

getRequiredIdsForEveryone(): Returns a list of item IDs required for all students.

getExtraIds(studentId): Retrieves a list of extra item IDs based on a student's preferences, caching the result for efficiency.

addPersonsWithSameIds(studentId, extraIds, minExtraCourseSize, pq, path): Allocates paths to students with similar preferences.

dfs(node, edges, requiredIds, path, studentId, minExtraCourseSize, extraIds): Performs a depth-first search to find a suitable path for allocating items to a student.

createPQ(): Creates a priority queue of students based on the number of extra items they can accommodate.

arraysHaveSameValues(arr1, arr2): Checks if two arrays have the same values, used for comparing extra item IDs.

findItemsByStudentId(studentId, items): Finds items allocated to a specific student.

main(items, students, project, polls): Main function orchestrating the allocation process. Initializes data structures, creates a priority queue, builds the graph, and allocates items to students.

Usage
To use the project, follow these steps:

Import the necessary classes and data structures.

Call the main function with the relevant data (items, students, project, polls).

Access the allocated items using the findItemsByStudentId function or retrieve extra item IDs using getExtraIds.

Customize the project as needed, adjusting parameters such as time gaps and required items.

Notes
The project assumes a time-based allocation strategy, considering time gaps between items.

Efficiency is a key focus, with caching mechanisms and priority queues used to optimize the allocation process.

Ensure that the input data adheres to the expected structures and formats for proper functioning.

Feel free to explore and modify the project based on specific requirements and use cases.
