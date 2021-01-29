import ImageController from "./controllers/image.controller";
import config from 'config';
import {Sequelize} from "sequelize-typescript";
import cors from 'cors';
import bodyParser from "body-parser";
import Image from "./models/image/image.model";
import Tag from "./models/tag/tag.model";
import ImageTag from "./models/imageTag/imageTag.model";
import http from "http";
import cron from 'node-cron';
import ExternalSourceService from "./services/externalSource.service";


const express = require('express');

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

const app = express();
const port = config.get('port');
const dbConfig = config.get(process.env.NODE_ENV);
let server;

const sequelize = new Sequelize({
    database: dbConfig.database,
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    username: dbConfig.username,
    password: dbConfig.password,
    models: [Image, Tag, ImageTag],
});

const imageController = new ImageController(sequelize);
const externalSourceService = new ExternalSourceService(sequelize);

cron.schedule(`*/${config.get('syncTime')} * * * *`, () => {
    externalSourceService.fetchImagesFromExternalSource();
});

app.get('/images', imageController.getList.bind(imageController));
app.get('/images/:guid', imageController.getImageDetails.bind(imageController))

app.use(bodyParser.json());
app.use(cors());

server = http.createServer(app);

server.listen(port, err => {
    const address = server.address();

    process.on('unhandledRejection', (exception) => {
        console.error('Unhandled Rejection:', exception);
        process.exit(1);
    });

    if (typeof address === 'string') {
        console.info(`Application has been launched on ${address}`);
    } else {
        console.info(`Application has been launched on ${address.port} port`);
    }
});
