interface Item {
    _id: string;
    title: string;
    startTime: Date;
    endTime: Date;
    eventId: string;
    studentIds: string[];
    studentCapacity: number;
}

export default Item;
