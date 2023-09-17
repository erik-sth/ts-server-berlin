const students: IStudent[] = [
  { _id: "person1" },
  { _id: "person2" },
  { _id: "person3" },
  { _id: "person4" },
  { _id: "person5" },
  { _id: "person6" },
  { _id: "person7" },
];
interface IStudent {
  _id: string;
}
export { IStudent, students };
