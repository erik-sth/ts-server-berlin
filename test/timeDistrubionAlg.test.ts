import {
  findItemsByStudentId,
  getExtraIds,
  getRequiredIdsForEveryone,
  main,
} from "../alg/TimeDistribution";
import { items, polls, students, project } from "./data";

describe("main function", () => {
  it("should allocate items to students correctly", () => {
    const result = main(items, students, project, polls);
    const idLength = getRequiredIdsForEveryone().length;
    students.forEach((student) => {
      const studentId = student._id;
      const itemsForStudent = findItemsByStudentId(studentId, result);
      const expectedItemCount = idLength + getExtraIds(student._id).length;
      // Check if the number of allocated items matches the expected count
      expect(itemsForStudent.length).toBe(expectedItemCount);
    });
  });
});
