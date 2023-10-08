import { arraysHaveSameValues } from "../utils/array";
interface Group {
  id: number;
  path: string[];
  studentIds: string[];
}
class Groups {
  groups: Group[];

  constructor() {
    this.groups = [];
  }

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

  getAll() {
    return this.groups;
  }

  get(path: string[]): Group | undefined {
    return this.groups.find((group) => arraysHaveSameValues(group.path, path));
  }
}

export { Group, Groups };
