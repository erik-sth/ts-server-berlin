import express, { Request, Response } from 'express';
import { Project, validateSchema } from '../models/project';
import _ from 'lodash';
import { isValidObjectId } from 'mongoose';
const router = express.Router();

router.get('/:id?', async (req: Request, res: Response) => {
    if (req.params.id && !isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid ObjectId');
    }

    const data = req.params.id
        ? await Project.findById(req.params.id)
        : await Project.find();

    res.send(data);
});
router.post('/', async (req: Request, res: Response) => {
    const { error } = validateSchema(req.body);
    if (error) {
        res.status(400).send(error.message);
        return;
    }
    let project = await Project.findOne(_.pick(req.body, ['name']));
    if (project) {
        res.status(400);
        return res.send('Project already exists.');
    }
    project = new Project(
        _.pick(req.body, [
            'status',
            'name',
            'reasonForFailing',
            'relatedPolls',
            'idsThatAreRequiredForEveryone',
        ])
    );
    project.failed = false;
    await project.save();

    res.send({ data: project });
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
