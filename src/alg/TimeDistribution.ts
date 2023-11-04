import { Group, Groups } from '../Class/Groups';
// import { PriorityQueue } from '../Class/PriorityQueue';
import PollQuestion from '../types/Polls';
import Student from '../types/Student';
import createGraph from './TimeDistribution/CreateGraph';
import { distributeStudentsToPaths } from './TimeDistribution/DistributeStudents';
import { findPathsForTheGroups } from './TimeDistribution/FindPaths';
import { getVotingIds } from './TimeDistribution/Utils';
import { allocateGroupsToItems } from './TimeDistribution/AllocateGroupsToItems';
import Item from '../types/Item';
import Project from '../types/Project';

function buildGroupsByPaths(
    polls: PollQuestion[],
    students: Student[]
): Group[] {
    const groups = new Groups();
    students.forEach((student) => {
        groups.add(getVotingIds(student._id, polls), student._id);
    });
    return groups.getAll();
}

function main(
    items: Item[],
    students: Student[],
    project: Project,
    polls: PollQuestion[]
): boolean {
    const groups = buildGroupsByPaths(polls, students);
    const g = createGraph(items);
    const res = findPathsForTheGroups(groups, items, g, project);
    if (!res) return false;
    const res2 = distributeStudentsToPaths(items, groups);
    if (!res2) return false;
    allocateGroupsToItems(items, groups, project);
    return true;
}

export { main, getVotingIds };
