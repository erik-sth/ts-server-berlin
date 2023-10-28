import { Path_config } from './Path_config';
export default interface Group {
    _id: number;
    requiredEvents: string[];
    studentIds: string[];
    paths: Path_config[];
}
