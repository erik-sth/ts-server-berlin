import { Group, Groups } from '../Class/Groups';
import PollQuestion from '../types/Polls';

import Student from '../types/Student';

import createGraph from './TimeDistribution/CreateGraph';
import { distributeStudentsToPaths } from './TimeDistribution/DistributeStudents';
import { findPathsForTheGroups } from './TimeDistribution/FindPaths';
import { getVotingIds } from './TimeDistribution/Utils';
import { allocateGroupsToItems } from './TimeDistribution/AllocateGroupsToItems';
import Item from '../types/Item';
import Project from '../types/Project';
import Room from '../types/Room';
import { rooms } from '../data/Rooms';

function buildGroupsByPaths(
    polls: PollQuestion[],
    students: Student[],
    project: Project
): Group[] {
    const groups = new Groups();
    students.forEach((student) => {
        groups.add(getVotingIds(student._id, polls), student._id);
    });
    if (groups.size() == 0) {
        project.failed = true;
        project.reasonForFailing = 'Zero Possilbe Groups';
    }
    return groups.getAll();
}

function validating(
    project: Project,
    items: Item[],
    students: Student[],

    rooms: Room[]
): boolean {
    if (items.length > 0 && students.length > 0 && rooms.length > 0) {
        return true;
    } else {
        project.failed = true;
        project.reasonForFailing = `StudentsAmount: ${students.length}}; RoomsAmount: ${rooms.length}; ItemsAmount: ${items.length}`;
        return false;
    }
}

function main(
    items: Item[],
    students: Student[],
    project: Project,
    polls: PollQuestion[]
): boolean {
    project.status = 'Validating';
    validating(project, items, students, rooms);
    if (project.failed) return false;

    project.status = 'CreateGroups';
    const groups = buildGroupsByPaths(polls, students, project);
    if (project.failed) return false;

    project.status = 'CreateGraph';
    const g = createGraph(items, project);
    if (project.failed) return false;

    project.status = 'FindPaths';
    findPathsForTheGroups(groups, items, g, project);
    if (project.failed) return false;

    project.status = 'Distributing';
    distributeStudentsToPaths(items, groups, project);
    if (project.failed) return false;

    project.status = 'Allocating';
    allocateGroupsToItems(items, groups, project);
    if (project.failed) return false;

    project.status = 'FinishedCalc';
    return true;
}

export { main, getVotingIds };
