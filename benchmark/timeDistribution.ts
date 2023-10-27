import { main } from '../src/alg/TimeDistribution';
import { getItems } from '../src/data/Items';
import { getPolls } from '../src/data/Polls';
import { getProject } from '../src/data/Projects';
import { getStudents } from '../src/data/Students';
import * as fs from 'fs';

interface BenchmarkResults {
    algorithm: string;
    version: string;
    numIterations: number;
    executionTimes: number[];
    middleValue: number;
    timestamp: string;
}

const project = getProject();
const projectId = project._id;
const items = getItems(projectId);
const students = getStudents(projectId);
const polls = getPolls(projectId);

// Benchmark settings
const numIterations = 1000;
const executionTimes: number[] = [];

// Run the function 1000 times and record execution times
for (let i = 0; i < numIterations; i++) {
    const startTime = performance.now();
    main(items, students, project, polls);
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    executionTimes.push(executionTime);
}

// Sort the execution times in ascending order
executionTimes.sort((a, b) => a - b);

// Calculate the middle value (median)
let middleValue: number;

if (numIterations % 2 === 0) {
    // If the number of iterations is even, take the average of the two middle values
    const middleIndex1 = numIterations / 2 - 1;
    const middleIndex2 = numIterations / 2;
    middleValue =
        (executionTimes[middleIndex1] + executionTimes[middleIndex2]) / 2;
} else {
    // If the number of iterations is odd, take the middle value directly
    const middleIndex = Math.floor(numIterations / 2);
    middleValue = executionTimes[middleIndex];
}

const benchmarkResults: BenchmarkResults = {
    algorithm: 'TimeDistribution',
    version: 'v1',
    numIterations,
    executionTimes,
    middleValue,
    timestamp: new Date().toISOString(),
};
const resultsFilePath: string = 'results.json';
let existingResultsArray: BenchmarkResults[] = [];

if (fs.existsSync(resultsFilePath)) {
    try {
        const existingResults = fs.readFileSync(resultsFilePath, 'utf-8');
        existingResultsArray = JSON.parse(existingResults);
        if (!Array.isArray(existingResultsArray)) {
            existingResultsArray = [];
        }
    } catch (error) {
        console.error('Error parsing existing results:', error);
        existingResultsArray = [];
    }
}

existingResultsArray.push(benchmarkResults);

fs.writeFileSync(
    resultsFilePath,
    JSON.stringify(existingResultsArray, null, 2)
);
