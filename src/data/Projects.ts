import { Project } from "../../test/data";

const berlin: Project = {
  _id: "projectId1",
  name: "Berlin 2024",
  idsThatAreRequiredForEveryone: [
    "group1",
    "group2",
    "group3",
    "solo2",
    "solo3",
    "solo4",
    "solo5",
  ],
  relatedPolls: ["id0", "id1"],
};
function getProject(): Project {
  return berlin;
}
export { getProject };
