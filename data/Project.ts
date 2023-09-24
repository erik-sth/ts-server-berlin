interface Project {
  name: string;
  requiredForall: string[];
  relatedPolls: string[];
}

const berlin: Project = {
  name: "Berlin 2024",
  requiredForall: [
    "asdfjklasdföalsjf",
    "hallo4",
    "hallo2",
    "solo3",
    "hallo4",
    "asdfjklasdföalsjf",
    "hallo3",
    "test1",
    "solo2",
    "solo1",
  ],
  relatedPolls: ["id0", "id1"],
};

export { berlin };
