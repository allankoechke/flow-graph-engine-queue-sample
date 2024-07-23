const express = require('express');
const multer = require('multer');
const path = require('path');
const axios = require('axios').default;
const fs = require('fs');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
const aps = require("./flow-grap-engine")


const app = express();

let APS_ACCESS_TOKEN = ""
let data = []

// Middleware to extract access token
function extractToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        req.token = token;
        next();
    } else {
        res.status(401).send('Access token is missing');
    }
}

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Public folder
app.use(express.static('./public'));

function validateFiles(req, res) {
    const files = req.files.taskFiles;
    let hasJson = false;
    let hasUsd = false;

    if (files.length !== 2) {
        return res.send({
            status: false,
            message: "Please select exactly two files: one .json and one .usd"
        });
    }

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.name.endsWith(".json")) {
            hasJson = true;
        } else if (file.name.endsWith(".usd")) {
            hasUsd = true;
        }
    }

    if (!hasJson || !hasUsd) {
        return res.send({
            status: false,
            message: "Please select one .json file and one .usd file."
        });
    }

    return true;
}

app.post('/login', async (req, res) => {
    if (!req.body.clientID) {
        return res.send({
            status: false,
            message: 'Client ID is required'
        });
    }

    if (!req.body.clientSecret) {
        return res.send({
            status: false,
            message: 'Client Secret is required'
        });
    }

    const accessToken = await aps.getOauthToken(req.body.clientID, req.body.clientSecret);

    if (accessToken === "")
        return res.status(403).send({
            status: false,
            message: 'Client log in failed'
        });

    else
        return res.status(200).send({
            status: true,
            message: 'Logged in',
            token: accessToken
        });
});

// Upload endpoint
app.post('/task', extractToken, async (req, res) => {
    try {
        if (!req.body.taskName) {
            return res.send({
                status: false,
                message: 'Task name not provided (taskName)'
            });
        }

        if (!req.files) {
            return res.send({
                status: false,
                message: 'No files uploaded'
            });
        }

        if (!validateFiles(req, res)) {
            return res.send({
                status: false,
                message: 'Required files/inputs missing! Please select one .json file and one .usd file.'
            });
        }

        else {
            const files = req.files.taskFiles;
            let bifrostGraph = files[0].name.endsWith(".json") ? files[0] : files[1]
            let inputUsd = files[0].name.endsWith(".usd") ? files[0] : files[1]

            let now = Date.now()
            let bifrostGraphName = `${now}-${bifrostGraph.name}`
            let inputUsdName = `${now}-${inputUsd.name}`

            bifrostGraph.mv('./uploads/' + bifrostGraphName);
            inputUsd.mv('./uploads/' + inputUsdName);

            access_token = req.token
            return await prepareRequest(req, res, access_token, path.join(__dirname, `../uploads/${bifrostGraphName}`), path.join(__dirname, `../uploads/${inputUsdName}`))

            //send response
            // res.send({
            //     status: true,
            //     message: 'File is uploaded',
            //     data: {
            //     }
            // });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/status', extractToken, async (req, res) => {
    try {
        if (!req.body.jobId) {
            return res.send({
                status: false,
                message: 'Job Id Required'
            });
        }

        if (!req.body.queueId) {
            return res.send({
                status: false,
                message: 'Queue ID required'
            });
        }

        let job = await aps.getJob(req.token, req.body.queueId, req.body.jobId);
        console.log(job)

        if (job.status !== 'SUCCEEDED' && job.status !== 'FAILED' && job.status !== 'CANCELED') {
            return res.status(200).send({
                status: job.status,
                logs: [],
                outputs: [],
                error: null
            })
        }

        let queueId = req.body.queueId;
        let jobId = req.body.jobId;

        const ts = Date.now();
        var logsArray = [];
        var outputArray = [];
        var resObj = { status: job.status, error: null, outputs: [], logs: [] };

        // Downloading logs for the job
        const logsDirectory = path.join(__dirname, `../.outputs/${ts}/.logs`);
        console.log(`Downloading logs in ${logsDirectory}`);
        aps.createDirectory(logsDirectory);
        const logs = await aps.getLogs(req.token, queueId, jobId);
        logs.results.forEach(async (result, index) => {
            const downloadUrl = await aps.getDownloadUrlForResource(req.token, result.spaceId, result.resourceId);
            let log = path.join(logsDirectory, `log_${index}.log`)
            resObj.logs.push(log.toString())
            await aps.downloadFileFromSignedUrl(downloadUrl.url, log);
        });

        // Downloading outputs for the job
        const outputsDirectory = path.join(__dirname, `../.outputs/${ts}`);
        console.log(`Downloading outputs in ${outputsDirectory}`);
        aps.createDirectory(outputsDirectory);
        const outputs = await aps.getOutputs(req.token, queueId, jobId);
        outputs.results.forEach(async (result, index) => {
            try {
                const downloadUrl = await aps.getDownloadUrlForResource(req.token, result.spaceId, result.resourceId);
                const outputFile = path.join(outputsDirectory, `output_${index}.usd`);
                resObj.logs.push(outputFile.toString())
                await aps.downloadFileFromSignedUrl(downloadUrl.url, outputFile);
                console.log(outputFile, outputFile.toString())
            } catch (err) {
                console.log("Output Error: ", err)
            }
        });

        if (job.status === 'FAILED') {
            const taskExecutions = await aps.getTaskExecutions(req.token, queueId, jobId);
            const taskError = taskExecutions?.results?.[0].error;
            if (taskError) {
                console.log(JSON.stringify(taskError));
                resObj.error = taskError;
            }
        }

        console.log('Done')
        console.log(resObj)

        return res.status(200).send(resObj)

    } catch (err) {
        res.status(500).send(err);
    }
});

async function prepareRequest(req, res, access_token, bifrostGraphPath, inputFilePath) {
    const storageSpaceId = 'scratch:@default';

    // use the personal queue for our app
    const queueId = '@default';

    // Upload input file (plane.usd)
    console.log('Uploading input file');
    const getInputFileUploadUrlResponse = await aps.getResourceUploadUrl(access_token, storageSpaceId, path.parse(inputFilePath).base);
    const inputFileEtag = await aps.uploadToSignedUrl(getInputFileUploadUrlResponse.urls[0].url, inputFilePath);
    const inputFileUrn = await aps.completeUpload(access_token, storageSpaceId, getInputFileUploadUrlResponse.upload.resourceId, getInputFileUploadUrlResponse.upload.id, inputFileEtag);
    console.log('Input File uploaded');

    // Upload bifrost graph file (addTrees.json)
    console.log('Uploading bifrost graph file');
    const getGraphUploadUrlResponse = await aps.getResourceUploadUrl(access_token, storageSpaceId, path.parse(bifrostGraphPath).base);
    const bifrostGraphEtag = await aps.uploadToSignedUrl(getGraphUploadUrlResponse.urls[0].url, bifrostGraphPath);
    const bifrostGraphUrn = await aps.completeUpload(access_token, storageSpaceId, getGraphUploadUrlResponse.upload.resourceId, getGraphUploadUrlResponse.upload.id, bifrostGraphEtag);
    console.log('Bifrost graph file uploaded');

    // Submit job
    let taskName = req.body.taskName
    console.log("Task Name: ", req.body.taskName)
    const jobId = await aps.submitJob(access_token, queueId, bifrostGraphUrn, inputFileUrn, { bifrostGraphPath, inputFilePath, taskName });

    if (!jobId) {
        console.log("Job submission task failed")
        return res.status(500).send({
            message: "Job submission failed, internal error"
        });
    }

    console.log(`Job submitted, id: ${jobId}`);
    return res.status(200).send({
        jobId,
        queueId
    });
};

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});