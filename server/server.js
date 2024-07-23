const express = require('express');
const multer = require('multer');
const path = require('path');
const axios = require('axios');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');


const app = express();


// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
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

// Upload endpoint
app.post('/task', async (req, res) => {
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

        if(!validateFiles(req, res)) {
            return res.send({
                status: false,
                message: 'Required files/inputs missing! Please select one .json file and one .usd file.'
            });
        }

        else {
            const files = req.files.taskFiles;
            let bifrostGraph = files[0].name.endsWith(".json") ? files[0] : files[1]
            let inputUsd = files[0].name.endsWith(".usd") ? files[0] : files[1]

            bifrostGraph.mv('./uploads/' + bifrostGraph.name);
            inputUsd.mv('./uploads/' + inputUsd.name);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});