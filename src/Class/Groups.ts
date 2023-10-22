import { Group } from "../types/Group";
import { arraysHaveSameValues } from "../utils/array";

class Groups {
  private groups: Group[] = [];

  constructor() {}

  add(path: string[], studentId: string): void {
    const existingGroup = this.groups.find((group) =>
      arraysHaveSameValues(group.path, path)
    );

    if (existingGroup) {
      existingGroup.studentIds.push(studentId);
    } else {
      this.groups.push({
        path,
        studentIds: [studentId],
        id: this.groups.length + 1,
      });
    }
  }

  getAll(): Group[] {
    return this.groups;
  }

  get(path: string[]): Group {
    return this.groups.find((group) => arraysHaveSameValues(group.path, path));
  }
}

export { Group, Groups };
