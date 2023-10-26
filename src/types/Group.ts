import Item from './Item';

export interface Group {
    _id: number;
    requiredEvents: string[];
    studentIds: string[];
}
