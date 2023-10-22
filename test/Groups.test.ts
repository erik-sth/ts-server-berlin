import { Groups, Group } from "../src/Class/Groups";

describe("Groups class", () => {
  let groups: Groups;

  beforeEach(() => {
    groups = new Groups();
  });

  it("should add a student to an existing group", () => {
    const path = ["A", "B", "C"];
    const studentId = "123";

    groups.add(path, studentId);

    const expectedGroup: Group = { path, studentIds: [studentId], _id: 1 };
    expect(groups.getAll()).toEqual([expectedGroup]);
  });

  it("should create a new group if path doesn't exist", () => {
    const path1 = ["A", "B", "C"];
    const path2 = ["X", "Y", "Z"];
    const studentId1 = "123";
    const studentId2 = "456";

    groups.add(path1, studentId1);
    groups.add(path2, studentId2);

    const expectedGroups: Group[] = [
      { path: path1, studentIds: [studentId1], _id: 1 },
      { path: path2, studentIds: [studentId2], _id: 2 },
    ];
    expect(groups.getAll()).toEqual(expectedGroups);
  });

  it("should get a group by path", () => {
    const path = ["A", "B", "C"];
    const studentId = "123";

    groups.add(path, studentId);

    const retrievedGroup = groups.get(path);

    const expectedGroup: Group = { path, studentIds: [studentId], _id: 1 };
    expect(retrievedGroup).toEqual(expectedGroup);
  });

  it("should return undefined when getting a non-existing group", () => {
    const path = ["X", "Y", "Z"];

    const retrievedGroup = groups.get(path);

    expect(retrievedGroup).toBeUndefined();
  });
});
