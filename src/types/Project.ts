interface Project {
  _id: string;
  name: string;
  requiredForAll: string[];
  relatedPolls: string[];
}
export default Project;
