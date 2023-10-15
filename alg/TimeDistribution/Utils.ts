import Item from "../../types/Item";
import PollQuestion from "../../types/Polls";
import Project from "../../types/Project";

const EXTRA_IDS_CACHE = new Map<string, string[]>();
function getDefaultIds(project: Project): string[] {
  return project.requiredForAll;
}

function getVotingIds(studentId: string, polls: PollQuestion[]): string[] {
  const EMPTY_STRING = "";
  if (EXTRA_IDS_CACHE.has(studentId)) {
    return EXTRA_IDS_CACHE.get(studentId)!;
  }

  const relevantPolls = polls
    .filter((poll) =>
      poll.choices.some(
        (choice) =>
          choice.studentIds.includes(studentId) &&
          choice.eventId !== EMPTY_STRING
      )
    )
    .flatMap((poll) =>
      poll.choices
        .filter(
          (choice) =>
            choice.studentIds.includes(studentId) &&
            choice.eventId !== EMPTY_STRING
        )
        .map((choice) => choice.eventId)
    );

  EXTRA_IDS_CACHE.set(studentId, relevantPolls);
  return relevantPolls;
}
function findItemsByStudentId(studentId: string, items: Item[]): Item[] {
  return items.filter((item) => item.studentIds.includes(studentId));
}

export { getDefaultIds, getVotingIds, findItemsByStudentId };
