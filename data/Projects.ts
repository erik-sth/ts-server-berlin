import Project from '../src/types/Project';

const berlin: Project = {
    _id: 'projectId1',
    name: 'Berlin 2024',
    requiredEventGroupsAsIds: [
        'group1',
        'group2',
        'group3',
        'solo2',
        'solo3',
        'solo4',
        'solo5',
    ],
    pollIds: ['id0', 'id1'],
    status: 'WaitingForWorker',
    reasonForFailing: '',
    failedCalculating: false,
};
const projects = [berlin];

function getProjects(): Project[] {
    return projects;
}
function getProject(projectId: string): Project {
    return projects.find((p) => p._id === projectId);
}
export { getProjects, getProject };
