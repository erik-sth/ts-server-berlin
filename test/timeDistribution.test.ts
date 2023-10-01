import {
  findItemsByStudentId,
  getExtraIds,
  getRequiredIdsForEveryone,
  main,
} from "../TimeDisribution";
import { items, polls, students, project } from "./data";

describe("main function", () => {
  it("check size", () => {
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
  it("should have the same ids", () => {
    const result = main(items, students, project, polls);
    const eventIds = getRequiredIdsForEveryone();
    students.forEach((student) => {
      const studentId = student._id;
      const studentResults = findItemsByStudentId(studentId, result);
      const ids = [];
      studentResults.forEach((item) => ids.push(item.eventId));
      const expectedItemCount = [...eventIds, ...getExtraIds(student._id)];
      // Check if the number of allocated items matches the expected count
      expect(ids).toEqual(expect.arrayContaining(expectedItemCount));
    });
  });

  it("checking for overlapping and group exceeding", () => {
    const result = main(items, students, project, polls);
    const idLength = getRequiredIdsForEveryone().length;

    students.forEach((student) => {
      const studentId = student._id;
      const itemsForStudent = findItemsByStudentId(studentId, result);
      const expectedItemCount = idLength + getExtraIds(studentId).length;

      // Check if the number of allocated items matches the expected count
      expect(itemsForStudent.length).toBe(expectedItemCount);

      // Check for overlapping events in the student's schedule
      for (let i = 0; i < itemsForStudent.length; i++) {
        for (let j = i + 1; j < itemsForStudent.length; j++) {
          const itemA = itemsForStudent[i];
          const itemB = itemsForStudent[j];
          const overlap =
            itemA.startTime < itemB.endTime && itemA.endTime > itemB.startTime;

          // If there is an overlap, fail the test
          expect(overlap).toBe(false);
        }
      }

      // Check that the group size is not exceeded for each event
      itemsForStudent.forEach((item) => {
        const groupEvents = itemsForStudent.filter(
          (otherItem) =>
            otherItem.eventId === item.eventId && otherItem !== item
        );
        const groupSize = item.groupSize;
        const studentsInGroup = groupEvents.reduce(
          (total, groupEvent) => total + groupEvent.studentIds.length,
          0
        );

        // Ensure that the number of students in the group does not exceed the group size
        expect(studentsInGroup).toBeLessThanOrEqual(groupSize);
      });
    });
  });
});
