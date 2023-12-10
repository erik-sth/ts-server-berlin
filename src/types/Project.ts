interface Project {
    _id: string;
    name: string;
    idsThatAreRequiredForEveryone: string[];
    relatedPolls: string[];
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
    failed: boolean;
    reasonForFailing: string;
}

export default Project;
