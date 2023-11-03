import Project from '../types/Project';
import Room from '../types/Room';

const rooms: Room[] = [
    {
        roomNumber: 101,
        gender: 'm',
        studentIds: [
            'person1',
            'person2',
            'person3',
            'person4',
            'person5',
            'person6',
        ],
    },
    {
        roomNumber: 102,
        gender: 'm',
        studentIds: [
            'person7',
            'person8',
            'person9',
            'person10',
            'person11',
            'person12',
        ],
    },
    {
        roomNumber: 103,
        gender: 'm',
        studentIds: [
            'person13',
            'person14',
            'person15',
            'person16',
            'person17',
            'person18',
        ],
    },
    {
        roomNumber: 104,
        gender: 'm',
        studentIds: [
            'person19',
            'person20',
            'person21',
            'person22',
            'person23',
            'person24',
        ],
    },
    {
        roomNumber: 105,
        gender: 'm',
        studentIds: [
            'person25',
            'person26',
            'person27',
            'person28',
            'person29',
            'person30',
        ],
    },
    {
        roomNumber: 106,
        gender: 'm',
        studentIds: [
            'person31',
            'person32',
            'person33',
            'person34',
            'person35',
            'person36',
        ],
    },
    {
        roomNumber: 107,
        gender: 'm',
        studentIds: [
            'person37',
            'person38',
            'person39',
            'person40',
            'person41',
            'person42',
        ],
    },
    {
        roomNumber: 108,
        gender: 'm',
        studentIds: [
            'person43',
            'person44',
            'person45',
            'person46',
            'person47',
            'person48',
        ],
    },
    {
        roomNumber: 109,
        gender: 'm',
        studentIds: [
            'person49',
            'person50',
            'person51',
            'person52',
            'person53',
            'person54',
        ],
    },
    {
        roomNumber: 110,
        gender: 'm',
        studentIds: [
            'person55',
            'person56',
            'person57',
            'person58',
            'person59',
            'person60',
        ],
    },
    {
        roomNumber: 111,
        gender: 'm',
        studentIds: [
            'person61',
            'person62',
            'person63',
            'person64',
            'person65',
            'person66',
        ],
    },
    {
        roomNumber: 112,
        gender: 'm',
        studentIds: [
            'person67',
            'person68',
            'person69',
            'person70',
            'person71',
            'person72',
        ],
    },
    {
        roomNumber: 113,
        gender: 'm',
        studentIds: [
            'person73',
            'person74',
            'person75',
            'person76',
            'person77',
            'person78',
        ],
    },
    {
        roomNumber: 114,
        gender: 'm',
        studentIds: [
            'person79',
            'person80',
            'person81',
            'person82',
            'person83',
            'person84',
        ],
    },
    {
        roomNumber: 115,
        gender: 'm',
        studentIds: [
            'person85',
            'person86',
            'person87',
            'person88',
            'person89',
            'person90',
        ],
    },
    {
        roomNumber: 116,
        gender: 'm',
        studentIds: [
            'person91',
            'person92',
            'person93',
            'person94',
            'person95',
            'person96',
        ],
    },
    {
        roomNumber: 117,
        gender: 'm',
        studentIds: ['person97', 'person98', 'person99', 'person100'],
    },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getRooms(project: Project) {
    return rooms;
}
function getRoom(project: Project, studentId: string): Room {
    return rooms.find((room) => room.studentIds.includes(studentId));
}
export { rooms, getRooms, getRoom };
