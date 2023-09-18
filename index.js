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
// ==

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/plans", mealPlanController);
app.use(express.static(path.join(__dirname, "./client/dist")));
app.get("*", function(_, res) {
    res.sendFile(
        path.join(__dirname, "./client/dist/index.html"),
        function (err) {
            res.status(500).send(err);
        }
    );
});

app.listen(PORT, async () => {
    try {
        logger.info("Attempting to connect to database...");
        await connect({
            host: DB_HOST,
            username: DB_USERNAME,
            password: DB_PASSWORD,
            port: DB_PORT
        });
        logger.info(`App listening @ http://localhost:${PORT}`);
    } catch (error) {
        logger.error(error);
        process.exit(1);
    }
});