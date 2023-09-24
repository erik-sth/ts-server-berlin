import { findItemsByStudentId, main } from "./alg/timeDistribution";
import { items } from "./data/Items";
import { students } from "./data/students";

console.time();
main(items, students);
console.timeEnd();
students.forEach((student) => {
  console.log("\n" + student._id + ": ");
  findItemsByStudentId(student._id, items).forEach((elemement) =>
    console.log(elemement.title, "test")
  );
});
