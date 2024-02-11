const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const logger = require("./configs/logger");
const connect = require("./configs/db");
const mealPlanController = require("./controllers/plan.controller")
const PORT = process.env.port ?? 3000;
// == Database Config ==
const DB_HOST = process.env.DB_HOST;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PORT = process.env.DB_PORT;
const DB_URI = process.env.DB_URI;

const dbConfig = DB_URI ? {
    uri: DB_URI
} : {
    host: DB_HOST,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    port: DB_PORT
};

// ==

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/plans", mealPlanController);

app.listen(PORT, () => {
    logger.info("Attempting to connect to the database...");

    try {
        connect(dbConfig);
    } catch (error) {
        logger.error(error);
        process.exit(1);
    }

    logger.info(`App listening @ http://localhost:${PORT}`);
});

module.exports = app;
