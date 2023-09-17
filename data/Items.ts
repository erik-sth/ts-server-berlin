interface Item {
  _id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  eventId: string;
  studentIds: string[];
  groupSize: number;
}
const items: Item[] = [
  {
    _id: "id1",
    title: "Meeting 1",
    startTime: new Date(2023, 8, 16, 9, 0),
    endTime: new Date(2023, 8, 16, 10, 0),
    eventId: "asdfjklasdföalsjf",
    studentIds: [],
    groupSize: 10,
  },
  {
    _id: "id2",
    title: "Lunch Break",
    startTime: new Date(2023, 8, 16, 12, 0),
    endTime: new Date(2023, 8, 16, 13, 0),
    eventId: "hallo3",
    studentIds: [],
    groupSize: 2,
  },
  {
    _id: "id3",
    title: "Meeting 2",
    startTime: new Date(2023, 8, 16, 14, 0),
    endTime: new Date(2023, 8, 16, 15, 0),
    eventId: "hallo2",
    studentIds: [],
    groupSize: 4,
  },
  {
    _id: "id4",
    title: "Training Session",
    startTime: new Date(2023, 8, 17, 10, 30),
    endTime: new Date(2023, 8, 17, 12, 0),
    eventId: "solo 3",
    studentIds: [],
    groupSize: 10,
  },
  {
    _id: "id5",
    title: "Project Discussion",
    startTime: new Date(2023, 8, 17, 14, 0),
    endTime: new Date(2023, 8, 17, 15, 30),
    eventId: "hallo2",
    studentIds: [],
    groupSize: 4,
  },
  {
    _id: "id6",
    title: "Client Meeting",
    startTime: new Date(2023, 8, 18, 11, 0),
    endTime: new Date(2023, 8, 18, 12, 0),
    eventId: "asdfjklasdföalsjf",
    studentIds: [],
    groupSize: 10,
  },
  {
    _id: "id7",
    title: "Coffee Break",
    startTime: new Date(2023, 8, 18, 15, 30),
    endTime: new Date(2023, 8, 18, 15, 45),
    eventId: "hallo3",
    studentIds: [],
    groupSize: 5,
  },
  {
    _id: "id8",
    title: "Team Meeting",
    startTime: new Date(2023, 8, 19, 9, 30),
    endTime: new Date(2023, 8, 19, 10, 30),
    eventId: "test 1",
    studentIds: [],
    groupSize: 10,
  },

  {
    _id: "id9",
    title: "Workshop",
    startTime: new Date(2023, 8, 19, 13, 0),
    endTime: new Date(2023, 8, 19, 15, 0),
    eventId: "solo2",
    studentIds: [],
    groupSize: 10,
  },
  {
    _id: "id10",
    title: "Project Review",
    startTime: new Date(2023, 8, 20, 14, 0),
    endTime: new Date(2023, 8, 20, 15, 30),
    eventId: "solo1",
    studentIds: [],
    groupSize: 10,
  },
];

export { Item, items };
