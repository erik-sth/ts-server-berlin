interface PollChoice {
    _id: string;
    text: string;
    eventId: string;
    studentIds: string[];
    limit?: number;
}

interface PollQuestion {
    _id: string;
    text: string;
    choices: PollChoice[];
}
export default PollQuestion;

export { PollChoice, PollQuestion };
