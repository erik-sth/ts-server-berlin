import { Project } from '../src/models/project';

function seedProjectRoute() {
    new Project({
        _id: '65750b72771d33966c6da5cc',
        name: 'GetSpecialId',
        idsThatAreRequiredForEveryone: ['solo5'],
        relatedPolls: ['id0', 'id1'],
        status: 'WaitingForWorker',
        reasonForFailing: '',
        failed: false,
    }).save();
}

export { seedProjectRoute };
