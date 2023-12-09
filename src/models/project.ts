import Joi from 'joi';
import mongoose, { Schema, Model } from 'mongoose';
import Project from '../types/Project';

// Project schema
const projectSchema = new Schema<Project>({
    name: { type: String, minlength: 3, maxlength: 50, required: true },
    idsThatAreRequiredForEveryone: { type: [String], required: true },
    relatedPolls: { type: [String], required: false },
    status: {
        type: String,
        enum: [
            'InPreparation',
            'WaitingForWorker',
            'Fetching',
            'Validating',
            'CreateGroups',
            'CreateGraph',
            'FindPaths',
            'Distributing',
            'Allocating',
            'FinishedCalc',
            'StoreData',
            'Finished',
        ],
        required: true,
    },
    failed: { type: Boolean, required: false },
    reasonForFailing: { type: String, required: false },
});

// Project Model
const Project: Model<Project> = mongoose.model('Project', projectSchema);

function validateSchema(project: Partial<Project>) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required().label('Name'),
        idsThatAreRequiredForEveryone: Joi.array()
            .items(Joi.string().required())
            .required(),
        relatedPolls: Joi.array().items(Joi.string().required()).required(),
        status: Joi.string()
            .valid(
                'InPreparation',
                'WaitingForWorker',
                'Fetching',
                'Validating',
                'CreateGroups',
                'CreateGraph',
                'FindPaths',
                'Distributing',
                'Allocating',
                'FinishedCalc',
                'StoreData',
                'Finished'
            )
            .required(),
        failed: Joi.boolean(),
    });

    const { error } = schema.validate({
        name: project.name,
        idsThatAreRequiredForEveryone: project.idsThatAreRequiredForEveryone,
        relatedPolls: project.relatedPolls,
        status: project.status,
        failed: project.failed,
    });

    return { error };
}

export { Project, validateSchema };
