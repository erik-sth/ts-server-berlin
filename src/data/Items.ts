import Item from '../types/Item';

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
        studentCapacity: 2,
    },
    {
        _id: 'id3',
        title: 'Meeting 2',
        startTime: new Date(2023, 8, 16, 14, 0),
        endTime: new Date(2023, 8, 16, 15, 0),
        eventId: 'group3',
        studentIds: [],
        studentCapacity: 100,
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
        studentCapacity: 98,
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
        studentCapacity: 98,
    },
    {
        _id: 'id11',
        title: 'Project Review',
        startTime: new Date(2023, 8, 21, 14, 0),
        endTime: new Date(2023, 8, 21, 15, 30),
        eventId: 'poll2',
        studentIds: [],
        studentCapacity: 50,
    },
];

function getItems(projectId: string): Item[] {
    if (projectId) {
        return items;
    }
}

export { getItems };
