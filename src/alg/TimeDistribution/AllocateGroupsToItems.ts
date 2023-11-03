import type Item from '../../types/Item';
import { Group } from '../../Class/Groups';
import { getRoom } from '../../data/Rooms';
import Project from '../../types/Project';

function allocateGroupsToItems(
    items: Item[],
    groups: Group[],
    project: Project
): void {
    items.forEach((item) => (item.studentIds = []));

    groups.forEach((group) => {
        const rooms = findRoommatesInGroup(group, project);
        group.paths.forEach((path_config) => {
            if (path_config.valueForTestingStudentDistribution !== 0) {
                let studentsCount =
                    path_config.valueForTestingStudentDistribution;

                while (studentsCount > 0) {
                    let room = rooms.shift();
                    if (studentsCount < room.length) {
                        const firstPart = room.slice(0, studentsCount);
                        const secondPart = room.slice(studentsCount);
                        room = firstPart;
                        rooms.push(secondPart);
                    }

                    allocateToItems(path_config.path, items, room);
                    studentsCount -= room.length;
                }
            }
        });
    });
    function findRoommatesInGroup(group: Group, project: Project) {
        let students = [...group.studentIds];
        const rooms: string[][] = [];
        while (students.length > 0) {
            const firstStudent = students.shift();
            const room = getRoom(project, firstStudent);
            const currentRoom = [firstStudent];
            room.studentIds.forEach((student) => {
                if (students.includes(student)) {
                    currentRoom.push(student);
                }
            });
            students = students.filter(
                (student) => !currentRoom.includes(student)
            );
            rooms.push(currentRoom);
        }
        return rooms;
    }
}
function allocateToItems(path: Item[], items: Item[], studentIds: string[]) {
    path.forEach((pathItem) => {
        const item = items.find((item) => item._id === pathItem._id);
        if (item) {
            studentIds.forEach((student) => item.studentIds.push(student));
        }
    });
}

export { allocateGroupsToItems };
