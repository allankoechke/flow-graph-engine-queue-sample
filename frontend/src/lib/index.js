// place files you want to import through the `$lib` alias in this folder.

import axios from 'axios';
import fs from 'fs';
import path from 'path';


async function getOauthToken(id, secret) {
    const response = await axios.post(
        'https://developer.api.autodesk.com/authentication/v2/token',
        {
            scope: 'data:read data:create data:write code:all',
            grant_type: 'client_credentials',
            client_id: id,
            client_secret: secret,
        },
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    );
    return response.data.access_token;
};

async function getResourceUploadUrl(accessToken, storageSpaceId, resourceId) {
    const response = await axios.get(
        `https://developer.api.autodesk.com/flow/storage/v1/spaces/${storageSpaceId}/resources/${resourceId}/upload-urls`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
    );
    return response.data;
};

async function uploadToSignedUrl(signedUrl, file) {
    const reader = new FileReader();
    const fileContent = reader.readAsArrayBuffer(file)
    const response = await axios.put(
        signedUrl,
        fileContent,
    );
    return response.headers.etag;
};

async function completeUpload(accessToken, storageSpaceId, resourceId, uploadId, etag) {
    const response = await axios.post(
        `https://developer.api.autodesk.com/flow/storage/v1/spaces/${storageSpaceId}/uploads:complete`,
        {
            resourceId,
            uploadId,
            parts: [
                {
                    partId: 1,
                    etag
                }
            ]
        },
        {
            headers: {
            Authorization: `Bearer ${accessToken}`,
            }
        },
    );
    return response.data.urn;
};

async function submitJob(accessToken, queueId, bifrostGraphUrn, inputFileUrn, amountOfTrees) {
    const reponse = await axios.post(
        `https://developer.api.autodesk.com/flow/compute/v1/queues/${queueId}/jobs`,
        {
            name: 'my sample app job',
            tags: ['sample app'],
            tasks: [
                {
                    name: 'execute bifrost graph',
                    type: 'task',
                    // Select the bifrost executor
                    executor: 'bifrost',
                    // Gloabl job inputs. We will provide our input file in the bifrost specific executions section instead of using this for now.
                    // If we would have provided the inputs here instead it would be present for every execution.
                    // For this example, it doesn't matter since we are only running a single frame execution.
                    inputs: [
                    ],
                    limitations: {
                        maxExecutionTimeInSeconds: 600,
                    },
                    payload: {
                        action: 'Evaluate',
                        options: {
                            // Specify which bifrost compound to execute
                            compound: 'User::Graphs::addTrees',
                            frames: {
                                start: 1,
                                end: 1,
                            },
                            // Specify the version of bifrost
                            bifrostVersion: '2.9.0.0'
                        },
                        // Specify the bifrost files to download and load.
                        definitionFiles: [{
                                source: {
                                    uri: bifrostGraphUrn
                                },
                                target: {
                                    path: 'bifrostgraph.json'
                                },
                            }
                        ],
                        // Specify what value to input into the bifrost graph ports
                        ports:{
                            inputPorts: [
                                {
                                    name: 'inputFilename',
                                    value: 'plane.usd',
                                    type: 'string',
                                },
                                {
                                    name: 'outputFilename',
                                    value: 'planeWithTrees.usd',
                                    type: 'string',
                                },
                                {
                                    name: 'amount',
                                    value: `${amountOfTrees}`,
                                    type: 'float',
                                }
                            ],
                            jobPorts: [],
                        },
                        // parameters for each bifrost execution
                        // in this case we only have a single for frame 1.
                        executions: [
                            {
                                inputs: [
                                    {
                                        source: {
                                            uri: inputFileUrn,
                                        },
                                        target: {
                                            path: 'plane.usd',
                                        }
                                    },
                                ],
                                outputs: [
                                    {
                                        source: {
                                            path: 'planeWithTrees.usd',
                                        },
                                        target: {
                                            name: 'planeWithTrees.usd',
                                        }
                                    }
                                ],
                                frameId: 1,
                            }
                        ],
                    },
                    requirements: {
                        cpu: 4,
                        memory: 30720,
                    }
                }
            ]
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        },
    );
    return reponse.data.id;
}

async function getTaskExecutions(accessToken, queueId, jobId) {
    const response = await axios.get(
        `https://developer.api.autodesk.com/flow/compute/v1/queues/${queueId}/jobs/${jobId}/executions`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
    );
    return response.data;
}

async function getJob(accessToken, queueId, jobId) {
    const response = await axios.get(
        `https://developer.api.autodesk.com/flow/compute/v1/queues/${queueId}/jobs/${jobId}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
    );
    return response.data;
}

async function getLogs(accessToken, queueId, jobId) {
    const response = await axios.get(
        `https://developer.api.autodesk.com/flow/compute/v1/queues/${queueId}/jobs/${jobId}/logs`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
    );
    return response.data;
}

async function getOutputs(accessToken, queueId, jobId) {
    const response = await axios.get(
        `https://developer.api.autodesk.com/flow/compute/v1/queues/${queueId}/jobs/${jobId}/outputs`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
    );
    return response.data;
}



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitForJobToComplete(accessToken, queueId, jobId) {
    let job = await getJob(accessToken, queueId, jobId);
    while (job.status !== 'SUCCEEDED' && job.status !== 'FAILED' && job.status !== 'CANCELED') {
        await sleep(5000);
        job = await getJob(accessToken, queueId, jobId);
    }
    return job;
}

async function getDownloadUrlForResource(accessToken, spaceId, resourceId) {
    const response = await axios.get(
        `https://developer.api.autodesk.com/flow/storage/v1/spaces/${spaceId}/resources/${resourceId}/download-url`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
    );
    return response.data;
}

async function downloadFileFromSignedUrl(signedUrl, destination) {
    const writeStream = fs.createWriteStream(destination);
    const response = await axios.get(
        signedUrl,
        {
            responseType: 'stream',
        }
    );
    response.data.pipe(writeStream)
    return new Promise((resolve, reject) => {
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
    });
}

async function createDirectory(directory) {
    try {
        await fs.promises.mkdir(directory);
    } catch (e) {
        // ignore, the directory probably already exist
    }
}

export default async function prepareRequest(task, id, secret, callback) {
    const amountOfTrees = 1000;
    const accessToken = await getOauthToken(id, secret);

    if(accessToken==="") {
        callback({
            uid: task.uid,
            status: "AUTH FAILED"
        })
    }

    const storageSpaceId = 'scratch:@default';

    // use the personal queue for our app
    const queueId = '@default';

    // Upload input file (plane.usd)
    console.log('Uploading input file');
    callback({
        uid: task.uid,
        status: "UPLOAD START"
    })

    const inputFile = task.files[0].name.endsWith(".usd") ? task.files[0] : task.files[1]
    const getInputFileUploadUrlResponse = await getResourceUploadUrl(accessToken, storageSpaceId, inputFile.name);
    const inputFileEtag = await uploadToSignedUrl(getInputFileUploadUrlResponse.urls[0].url, inputFile);
    const inputFileUrn = await completeUpload(accessToken, storageSpaceId, getInputFileUploadUrlResponse.upload.resourceId, getInputFileUploadUrlResponse.upload.id, inputFileEtag);
    console.log('Input File uploaded');

    // Upload bifrost graph file (addTrees.json)
    console.log('Uploading bifrost graph file');
    const bifrostGraph = task.files[0].name.endsWith(".json") ? task.files[0] : task.files[1]
    const getGraphUploadUrlResponse = await getResourceUploadUrl(accessToken, storageSpaceId, bifrostGraph.name);
    const bifrostGraphEtag = await uploadToSignedUrl(getGraphUploadUrlResponse.urls[0].url, bifrostGraph);
    const bifrostGraphUrn = await completeUpload(accessToken, storageSpaceId, getGraphUploadUrlResponse.upload.resourceId, getGraphUploadUrlResponse.upload.id, bifrostGraphEtag);
    console.log('Bifrost graph file uploaded');

    // Submit job
    const jobId = await submitJob(accessToken, queueId, bifrostGraphUrn, inputFileUrn, amountOfTrees);
    console.log(`Job submitted, id: ${jobId}`);

    console.log('Waiting for job to complete');
    const job = await waitForJobToComplete(accessToken, queueId, jobId);
    console.log(`Job finished with status ${job.status}`);

    if (job.status === 'FAILED') {
        const taskExecutions = await getTaskExecutions(accessToken, queueId, jobId);
        const taskError = taskExecutions?.results?.[0].error;
        if (taskError) {
            console.log(JSON.stringify(taskError));
        }
    }

    // Downloading logs for the job
    const logsDirectory = path.join(__dirname, './.logs');
    console.log(`Downloading logs in ${logsDirectory}`);
    createDirectory(logsDirectory);
    const logs = await getLogs(accessToken, queueId, jobId);
    logs.results.forEach(async (result, index) => {
        const downloadUrl = await getDownloadUrlForResource(accessToken, result.spaceId, result.resourceId);
        await downloadFileFromSignedUrl(downloadUrl.url, path.join(logsDirectory, `log_${index}.log`));
    });

    // Downloading outputs for the job
    const outputsDirectory = path.join(__dirname, './.outputs');
    console.log(`Downloading outputs in ${outputsDirectory}`);
    createDirectory(outputsDirectory);
    const outputs = await getOutputs(accessToken, queueId, jobId);
    outputs.results.forEach(async (result, index) => {
        const downloadUrl = await getDownloadUrlForResource(accessToken, result.spaceId, result.resourceId);
        await downloadFileFromSignedUrl(downloadUrl.url, path.join(outputsDirectory, `output_${index}.usd`));
    });
    console.log('Done')
}

