import { findItemsByStudentId, main } from "./alg/TimeDistribution";
import { items } from "./data/Items";
import { students } from "./data/Students";
import { polls } from "./data/Polls";
import { berlin } from "./data/Projects";

console.time();
main(items, students, berlin, polls);
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
