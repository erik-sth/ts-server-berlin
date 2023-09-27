interface Project {
  name: string;
  requiredForAll: string[];
  relatedPolls: string[];
}

const berlin: Project = {
  name: "Berlin 2024",
  requiredForAll: [
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

export { berlin, Project };
