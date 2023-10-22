interface Project {
  _id: string;
  name: string;
  idsThatAreRequiredForEveryone: string[];
  relatedPolls: string[];
}
export default Project;
