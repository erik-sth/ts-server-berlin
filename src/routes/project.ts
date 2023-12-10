import express, { Request, Response } from 'express';
import { Project, validateSchema } from '../models/project';
import _ from 'lodash';
import { isValidObjectId } from 'mongoose';
import { paginate, PaginationRequest } from '../middleware/pagination';
const router = express.Router();

router.get('/:id?', paginate, async (req: PaginationRequest, res: Response) => {
    if (req.params.id && !isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid ObjectId');
    }

    const data = req.params.id
        ? await Project.findById(req.params.id)
        : await Project.find().limit(req.limit);

    res.send(data);
});

router.post('/', async (req: PaginationRequest, res: Response) => {
    const { error } = validateSchema(req.body);

    if (error) {
        res.status(400).send(error.message);
        return;
    }

    // Sanitize and validate user-controlled data
    const projectName = req.body.name;
    if (!projectName) {
        res.status(400).send('Project name is required.');
        return;
    }

    // Check if the project with the given name already exists
    const existingProject = await Project.findOne({ name: projectName });

    if (existingProject) {
        res.status(400).send('Project already exists.');
        return;
    }

    // If the project doesn't exist, proceed to create it
    const project = new Project(
        _.pick(req.body, [
            'status',
            'name',
            'reasonForFailing',
            'relatedPolls',
            'idsThatAreRequiredForEveryone',
        ])
    );
    project.failed = false;

    try {
        await project.save();
        res.send({ data: project });
    } catch (saveError) {
        console.error(saveError);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    if (req.params.id && !isValidObjectId(req.params.id))
        return res.status(400).send('Missing Id');
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).send('Project not found.');
        }
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

export = router;
