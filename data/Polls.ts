interface PollChoice {
  id: number;
  text: string;
  eventId: string;
  studentIds: string[];
}

interface PollQuestion {
  id: number;
  text: string;
  choices: PollChoice[];
}

const polls: PollQuestion[] = [];
