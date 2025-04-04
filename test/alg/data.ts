import PollQuestion from '../../src/types/Polls';
import Student from '../../src/types/Student';
import Item from '../../src/types/Item';
import Project from '../../src/types/Project';

const items: Item[] = [
    {
        _id: 'id1',
        title: 'Meeting 1',
        startTime: new Date(2023, 8, 16, 9, 0),
        endTime: new Date(2023, 8, 16, 10, 0),
        eventId: 'group1',
        studentIds: [],
        studentCapacity: 100,
    },
    {
        _id: 'id2',
        title: 'Lunch Break',
        startTime: new Date(2023, 8, 16, 9, 0),
        endTime: new Date(2023, 8, 16, 10, 0),
        eventId: 'group2',
        studentIds: [],
        studentCapacity: 50,
    },
    {
        _id: 'id3',
        title: 'Meeting 2',
        startTime: new Date(2023, 8, 16, 14, 0),
        endTime: new Date(2023, 8, 16, 15, 0),
        eventId: 'group3',
        studentIds: [],
        studentCapacity: 50,
    },
    {
        _id: 'id4',
        title: 'Training Session',
        startTime: new Date(2023, 8, 17, 10, 30),
        endTime: new Date(2023, 8, 17, 12, 0),
        eventId: 'solo3',
        studentIds: [],
        studentCapacity: 100,
    },
    {
        _id: 'id5',
        title: 'Project Discussion',
        startTime: new Date(2023, 8, 17, 14, 0),
        endTime: new Date(2023, 8, 17, 15, 30),
        eventId: 'group2',
        studentIds: [],
        studentCapacity: 50,
    },
    {
        _id: 'id6',
        title: 'Client Meeting',
        startTime: new Date(2023, 8, 18, 11, 0),
        endTime: new Date(2023, 8, 18, 12, 0),
        eventId: 'group1',
        studentIds: [],
        studentCapacity: 50,
    },
    {
        _id: 'poll1',
        title: 'poll',
        startTime: new Date(2023, 8, 18, 11, 0),
        endTime: new Date(2023, 8, 18, 12, 0),
        eventId: 'poll1',
        studentIds: [],
        studentCapacity: 100,
    },
    {
        _id: 'id7',
        title: 'Coffee Break',
        startTime: new Date(2023, 8, 18, 15, 30),
        endTime: new Date(2023, 8, 18, 15, 45),
        eventId: 'solo4',
        studentIds: [],
        studentCapacity: 100,
    },
    {
        _id: 'id8',
        title: 'Team Meeting',
        startTime: new Date(2023, 8, 19, 9, 30),
        endTime: new Date(2023, 8, 19, 10, 30),
        eventId: 'solo5',
        studentIds: [],
        studentCapacity: 100,
    },

    {
        _id: 'id9',
        title: 'Workshop',
        startTime: new Date(2023, 8, 19, 13, 0),
        endTime: new Date(2023, 8, 19, 15, 0),
        eventId: 'solo2',
        studentIds: [],
        studentCapacity: 100,
    },
    {
        _id: 'id10',
        title: 'Project Review',
        startTime: new Date(2023, 8, 20, 14, 0),
        endTime: new Date(2023, 8, 20, 15, 30),
        eventId: 'group3',
        studentIds: [],
        studentCapacity: 50,
    },
    {
        _id: 'id11',
        title: 'Project Review',
        startTime: new Date(2023, 8, 21, 14, 0),
        endTime: new Date(2023, 8, 21, 15, 30),
        eventId: 'poll2',
        studentIds: [],
        studentCapacity: 100,
    },
];

export { items };

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

export { polls };

const project: Project = {
    _id: 'ProjectId',
    name: 'Berlin 2024',
    failedCalculating: false,
    reasonForFailing: '',
    status: 'WaitingForWorker',
    requiredEventGroupsAsIds: [
        'group1',
        'group2',
        'group3',
        'solo2',
        'solo3',
        'solo4',
        'solo5',
    ],
    pollIds: ['id0', 'id1'],
};

export { project, Project };
const students: Student[] = [
    { _id: 'person1' },
    { _id: 'person2' },
    { _id: 'person3' },
    { _id: 'person4' },
    { _id: 'person5' },
    { _id: 'person6' },
    { _id: 'person7' },
    { _id: 'person8' },
    { _id: 'person9' },
    { _id: 'person10' },
    { _id: 'person11' },
    { _id: 'person12' },
    { _id: 'person13' },
    { _id: 'person14' },
    { _id: 'person15' },
    { _id: 'person16' },
    { _id: 'person17' },
    { _id: 'person18' },
    { _id: 'person19' },
    { _id: 'person20' },
    { _id: 'person21' },
    { _id: 'person22' },
    { _id: 'person23' },
    { _id: 'person24' },
    { _id: 'person25' },
    { _id: 'person26' },
    { _id: 'person27' },
    { _id: 'person28' },
    { _id: 'person29' },
    { _id: 'person30' },
    { _id: 'person31' },
    { _id: 'person32' },
    { _id: 'person33' },
    { _id: 'person34' },
    { _id: 'person35' },
    { _id: 'person36' },
    { _id: 'person37' },
    { _id: 'person38' },
    { _id: 'person39' },
    { _id: 'person40' },
    { _id: 'person41' },
    { _id: 'person42' },
    { _id: 'person43' },
    { _id: 'person44' },
    { _id: 'person45' },
    { _id: 'person46' },
    { _id: 'person47' },
    { _id: 'person48' },
    { _id: 'person49' },
    { _id: 'person50' },
    { _id: 'person51' },
    { _id: 'person52' },
    { _id: 'person53' },
    { _id: 'person54' },
    { _id: 'person55' },
    { _id: 'person56' },
    { _id: 'person57' },
    { _id: 'person58' },
    { _id: 'person59' },
    { _id: 'person60' },
    { _id: 'person61' },
    { _id: 'person62' },
    { _id: 'person63' },
    { _id: 'person64' },
    { _id: 'person65' },
    { _id: 'person66' },
    { _id: 'person67' },
    { _id: 'person68' },
    { _id: 'person69' },
    { _id: 'person70' },
    { _id: 'person71' },
    { _id: 'person72' },
    { _id: 'person73' },
    { _id: 'person74' },
    { _id: 'person75' },
    { _id: 'person76' },
    { _id: 'person77' },
    { _id: 'person78' },
    { _id: 'person79' },
    { _id: 'person80' },
    { _id: 'person81' },
    { _id: 'person82' },
    { _id: 'person83' },
    { _id: 'person84' },
    { _id: 'person85' },
    { _id: 'person86' },
    { _id: 'person87' },
    { _id: 'person88' },
    { _id: 'person89' },
    { _id: 'person90' },
    { _id: 'person91' },
    { _id: 'person92' },
    { _id: 'person93' },
    { _id: 'person94' },
    { _id: 'person95' },
    { _id: 'person96' },
    { _id: 'person97' },
    { _id: 'person98' },
    { _id: 'person99' },
    { _id: 'person100' },
];

export { students };
