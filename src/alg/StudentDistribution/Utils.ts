import { Group } from '../../Class/Groups';
import Item from '../../types/Item';
import PollQuestion from '../../types/Polls';
import Project from '../../types/Project';
import Room from '../../types/Room';
import Student from '../../types/Student';
import { arraysHaveSameValues } from '../../utils/array';

const EXTRA_IDS_CACHE = new Map<string, string[]>();
function getRequiredGroupIds(project: Project): string[] {
    return project.requiredEventGroupsAsIds;
}

function getVotingIds(studentId: string, polls: PollQuestion[]): string[] {
    const EMPTY_STRING = '';
    if (EXTRA_IDS_CACHE.has(studentId)) {
        return EXTRA_IDS_CACHE.get(studentId)!;
    }

    const relevantPolls = polls
        .filter((poll) =>
            poll.choices.some(
                (choice) =>
                    choice.studentIds.includes(studentId) &&
                    choice.eventId !== EMPTY_STRING
            )
        )
        .flatMap((poll) =>
            poll.choices
                .filter(
                    (choice) =>
                        choice.studentIds.includes(studentId) &&
                        choice.eventId !== EMPTY_STRING
                )
                .map((choice) => choice.eventId)
        );

    EXTRA_IDS_CACHE.set(studentId, relevantPolls);
    return relevantPolls;
}
function findItemsByStudentId(studentId: string, items: Item[]): Item[] {
    return items.filter((item) => item.studentIds.includes(studentId));
}
function buildGroupsByPaths(
    polls: PollQuestion[],
    students: Student[],
    project: Project
): Group[] {
    const groups: Group[] = [];
    students.forEach((student) => {
        // if a group exists => add the student else create a group

        const itemPath = getVotingIds(student._id, polls);
        const group = findGroup(itemPath);
        if (group) group.studentIds.push(student._id);
        else
            groups.push({
                _id: groups.length + 1,
                paths: [],
                requiredEvents: itemPath,
                studentIds: [student._id],
            });
    });

    if (groups.length == 0) {
        project.failedCalculating = true;
        project.reasonForFailing = 'Zero Possilbe Groups';
    }

    return groups;

    function findGroup(path: string[]) {
        const matchingGroup: Group = groups.find((group) =>
            arraysHaveSameValues(group.requiredEvents, path)
        );
        return matchingGroup;
    }
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
        project.failedCalculating = true;
        project.reasonForFailing = `StudentsAmount: ${students.length}}; RoomsAmount: ${rooms.length}; ItemsAmount: ${items.length}`;
        return false;
    }
}

export {
    getRequiredGroupIds,
    getVotingIds,
    findItemsByStudentId,
    validating,
    buildGroupsByPaths,
};
