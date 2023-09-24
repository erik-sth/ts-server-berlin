interface PollChoice {
  _id: string;
  text: string;
  eventId: string;
  studentIds: string[];
}

interface PollQuestion {
  _id: string;
  text: string;
  choices: PollChoice[];
}

const polls: PollQuestion[] = [
  {
    _id: "id0",
    text: "test",
    choices: [
      { _id: "id1", eventId: "tsfdsf", studentIds: [], text: "text 1" },
      { _id: "id2", eventId: "tsfdsf", studentIds: [], text: "text 2" },
    ],
  },
  {
    _id: "id1",
    text: "test",
    choices: [
      {
        _id: "id1",
        eventId: "poll1",
        studentIds: [
          "person5",
          "person2",
          "person76",
          "person20",
          "person17",
          "person23",
          "person31",
          "person30",
          "person29",
          "person28",
          "person27",
          "person26",
          "person25",
          "person24",
        ],
        text: "text 3",
      },
      { _id: "id2", eventId: "tsfdsf", studentIds: [], text: "text 4" },
    ],
  },
];

export { polls };
