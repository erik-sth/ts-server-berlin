interface Item {
    _id: string;
    title: string;
    startTime: Date;
    endTime: Date;
    eventId: string;
    studentIds: string[];
    groupCapazity: number;
    updatedGroupCapacity: number;
}

export default Item;
