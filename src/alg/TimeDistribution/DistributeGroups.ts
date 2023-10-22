import { Group } from "../../Class/Groups";
import { PriorityQueue } from "../../Class/PriorityQueue";
import Item from "../../types/Item";
import { Path } from "../../types/Path";

const MAX_ITERATIONS = 2000;
let counter = 0;
let failed = false;

function createRecordOfGroupSizes(paths: Path[]): Record<string, number> {
  const record: Record<string, number> = {};
  paths.forEach((path) => {
    path.path.forEach((pathItem) => {
      record[pathItem] =
        (record[pathItem] || 0) + path.valueForDistributingOfStudents;
    });
  });
  return record;
}

function checkForToBigGroupSizes(paths: Path[], items: Item[]): void {
  const record = createRecordOfGroupSizes(paths);
  items.forEach((item) => {
    if (record[item._id] > item.groupCapazity) {
      redistribute(
        item._id,
        record[item._id] - item.groupCapazity,
        items,
        paths
      );
    }
  });
}
function distributeGroupsToPaths(
  pq: PriorityQueue<Group>,
  items: Item[],
  paths: Path[]
): void {
  while (!pq.isEmpty()) {
    const group = pq.dequeue();
    let amountStudentsRemaining = group.studentIds.length;

    paths.forEach((path) => {
      if (path.groupId === group._id && amountStudentsRemaining > 0) {
        const min = Math.min(
          path.groupCapacity - path.valueForDistributingOfStudents,
          amountStudentsRemaining
        );

        amountStudentsRemaining -= min;
        path.valueForDistributingOfStudents
          ? (path.valueForDistributingOfStudents = min)
          : (path.valueForDistributingOfStudents += min);
      }
    });
  }

  checkForToBigGroupSizes(paths, items);
}

function redistribute(
  failedId: string,
  excessStudents: number,
  items: Item[],
  paths: Path[]
): void {
  paths.forEach((path) => {
    const alternativePaths = paths.filter(
      (pathItem) =>
        pathItem.groupId === path.groupId && !pathItem.path.includes(failedId)
    );

    const failedGroupPaths = paths.filter(
      (pathItem) =>
        pathItem.groupId === path.groupId && pathItem.path.includes(failedId)
    );

    if (failedGroupPaths.length !== 0 && excessStudents !== 0) {
      failedGroupPaths.sort(
        (a, b) =>
          b.valueForDistributingOfStudents - a.valueForDistributingOfStudents
      );

      failedGroupPaths.forEach((failedPath) => {
        const removeCount =
          failedPath.valueForDistributingOfStudents - excessStudents;
        failedPath.valueForDistributingOfStudents = removeCount;

        let remainingExcessStudentsCount = excessStudents;

        alternativePaths.forEach((alternativePath) => {
          alternativePath.valueForDistributingOfStudents +=
            remainingExcessStudentsCount;
          remainingExcessStudentsCount = 0;
        });

        excessStudents = remainingExcessStudentsCount;
      });
    }
  });

  counter++;
  if (counter > MAX_ITERATIONS) {
    failed = true;
  } else {
    checkForToBigGroupSizes(paths, items);
  }
}

export { distributeGroupsToPaths };
