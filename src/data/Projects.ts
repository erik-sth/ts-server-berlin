import { Project } from '../../test/alg/data';

const berlin: Project = {
    _id: 'projectId1',
    name: 'Berlin 2024',
    idsThatAreRequiredForEveryone: [
        'group1',
        'group2',
        'group3',
        'solo2',
        'solo3',
        'solo4',
        'solo5',
    ],
    relatedPolls: ['id0', 'id1'],
    status: 'WaitingForWorker',
    reasonForFailing: '',
    failed: false,
};
const projects = [berlin];

function getProjects(): Project[] {
    return projects;
}
function getProject(projectId: string): Project {
    return projects.find((p) => p._id === projectId);
}
export { getProjects, getProject };
