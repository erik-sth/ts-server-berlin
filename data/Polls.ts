import PollQuestion from '../src/types/Polls';

const polls: PollQuestion[] = [
    {
        _id: 'id0',
        text: 'Wählt eine Veranstaltung!',
        choices: [
            {
                _id: 'id1',
                eventId: 'poll2',
                studentIds: [
                    'person5',
                    'person2',
                    'person76',
                    'person20',
                    'person17',
                    'person23',
                    'person31',
                    'person30',
                    'person29',
                    'person28',
                    'person27',
                    'person26',
                    'person25',
                    'person24',
                ],
                text: 'Blueman Group',
            },
            {
                _id: 'id2',
                eventId: 'tsfdsf',
                studentIds: [],
                text: 'Romeo und Julia',
            },
            {
                _id: 'id3',
                eventId: '',
                studentIds: [],
                text: 'Keins von beiden',
            },
        ],
    },
    {
        _id: 'id1',
        text: 'Wählt eine Veranstaltung!',
        choices: [
            {
                _id: 'id1',
                eventId: 'poll1',
                studentIds: [
                    'person5',
                    'person2',
                    'person76',
                    'person20',
                    'person17',
                    'person88',
                ],
                text: 'Planspiel Bundestag',
            },
            {
                _id: 'id2',
                eventId: 'P',
                studentIds: [],
                text: 'Planspiel Bundesrat',
            },
            {
                _id: 'id3',
                eventId: '',
                studentIds: [],
                text: 'Planspiel 3',
            },
        ],
    },
];
function getPolls(projectId: string): PollQuestion[] {
    if (projectId) {
        return polls;
    }
}
export { getPolls };
