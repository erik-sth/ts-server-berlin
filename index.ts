import { findItemsByStudentId, main } from "./alg/TimeDistribution";
import { getItems } from "./data/Items";
import { getStudents } from "./data/Students";
import { getPolls } from "./data/Polls";
import { getProject } from "./data/Projects";
const project = getProject();
const projectId = project._id;
console.time();
main(getItems(projectId), getStudents(projectId), project, getPolls(projectId));
console.timeEnd();

//O(n)
// students.forEach((student) => {
//   console.log("\n" + student._id + ": ");
//   findItemsByStudentId(student._id, items).forEach((elemement) =>
//     console.log(elemement._id, elemement.eventId)
//   );
// });

// O(n * m);
// students.forEach((student) => {
//   const length = findItemsByStudentId(student._id, items).length;
//   if (length != 0) return;
//   console.log("\n" + student._id + ": " + length);
// });
