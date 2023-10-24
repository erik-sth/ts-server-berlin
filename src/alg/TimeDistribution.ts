import { Group, Groups } from '../Class/Groups';
import { PriorityQueue } from '../Class/PriorityQueue';
import PollQuestion from '../types/Polls';
import Student from '../types/Student';
import createGraph from './TimeDistribution/CreateGraph';
import { distributeStudentsToPaths } from './TimeDistribution/DistributeGroups';
import { findPathsForTheGroups } from './TimeDistribution/FindPaths';
import { getVotingIds } from './TimeDistribution/Utils';
import { allocateGroupsToItems } from './TimeDistribution/AllocateGroupsToItems';
import Item from '../types/Item';
import Project from '../types/Project';
import { Path_config } from '../types/Path_config';

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

function createPQ(groups: Group[]): PriorityQueue<Group> {
    const pq = new PriorityQueue<Group>();
    groups.forEach((group) => {
        pq.enqueue(group, group.path.length);
    });
    return pq;
}

function main(
    items: Item[],
    students: Student[],
    project: Project,
    polls: PollQuestion[]
): Item[] {
    const groups = buildGroupsByPaths(polls, students);
    const g = createGraph(items);
    const path_configs: Path_config[] = findPathsForTheGroups(
        groups,
        items,
        g,
        project
    );
    const pq: PriorityQueue<Group> = createPQ(groups);
    distributeStudentsToPaths(pq, items, path_configs);

    allocateGroupsToItems(path_configs, items, groups);

    return items;
}

export { main, getVotingIds };
