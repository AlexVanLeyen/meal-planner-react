const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const logger = require("./configs/logger");
const connect = require("./configs/db");
const mealPlanController = require("./controllers/plan.controller")
const PORT = process.env.port ?? 5000;
const DB_URL = process.env.DB_URL;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/plan", mealPlanController);
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
        logger.info(`Attempting to connect to ${DB_URL}...`);
        await connect({
            url: DB_URL
        });
        logger.info(`Listening at ${PORT}`);
    } catch (error) {
        logger.error(error);
        process.exit(1);
    }
});