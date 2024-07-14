// tyoes
import PollQuestion from '../types/Polls';
import Student from '../types/Student';
import Item from '../types/Item';
import Project from '../types/Project';

// algorithmen stages
import createGraph from './StudentDistribution/CreateGraph';
import { distributeStudentsToPaths } from './StudentDistribution/DistributeStudents';
import { findPathsForTheGroups } from './StudentDistribution/FindPaths';
import { allocateGroupsToItems } from './StudentDistribution/AllocateGroupsToItems';

//data and utils
import { rooms } from '../data/Rooms';
import {
    buildGroupsByPaths,
    getVotingIds,
    validating,
} from './StudentDistribution/Utils';

function main(
    items: Item[],
    students: Student[],
    project: Project,
    polls: PollQuestion[]
): boolean {
    project.status = 'Validating';
    validating(project, items, students, rooms);
    if (project.failedCalculating) return false;

    project.status = 'CreateGroups';
    const groups = buildGroupsByPaths(polls, students, project);
    if (project.failedCalculating) return false;

    project.status = 'CreateGraph';
    const g = createGraph(items, project);
    if (project.failedCalculating) return false;

    project.status = 'FindPaths';
    findPathsForTheGroups(groups, items, g, project);
    if (project.failedCalculating) return false;

    project.status = 'Distributing';
    distributeStudentsToPaths(items, groups, project);
    if (project.failedCalculating) return false;

    project.status = 'Allocating';
    allocateGroupsToItems(items, groups, project);
    if (project.failedCalculating) return false;

    project.status = 'FinishedCalc';
    return true;
}

export { main, getVotingIds };
