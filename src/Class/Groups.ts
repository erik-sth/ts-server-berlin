import { arraysHaveSameValues } from '../utils/array';
import Group from './../types/Group';

class Groups {
    private groups: Group[] = [];

    constructor() {}

    add(path: string[], studentId: string): void {
        const existingGroup = this.groups.find((group) =>
            arraysHaveSameValues(group.requiredEvents, path)
        );

        if (existingGroup) {
            existingGroup.studentIds.push(studentId);
        } else {
            this.groups.push({
                requiredEvents: path,
                studentIds: [studentId],
                _id: this.groups.length + 1,
                paths: [],
            });
        }
    }

    getAll(): Group[] {
        return this.groups;
    }

    get(path: string[]): Group {
        return this.groups.find((group) =>
            arraysHaveSameValues(group.requiredEvents, path)
        );
    }
}

export { Group, Groups };
