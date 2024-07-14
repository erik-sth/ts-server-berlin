interface Project {
    _id: string;
    name: string;
    requiredEventGroupsAsIds: string[];
    pollIds: string[];
    status:
        | 'InPreperation'
        | 'WaitingForWorker'
        | 'Fetching'
        | 'Validating'
        | 'CreateGroups'
        | 'CreateGraph'
        | 'FindPaths'
        | 'Distributing'
        | 'Allocating'
        | 'FinishedCalc'
        | 'StoreData'
        | 'Finished';
    failedCalculating: boolean;
    reasonForFailing: string;
}

export default Project;
