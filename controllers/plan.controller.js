const express = require("express");
const Plan = require("../models/plan.model");
const { isValidIdentifier } = require("../utils/database");
const router = express.Router();

/**
 * Retrieves a list of all plans stored in the system
 * @returns {
 *  200: Plan[],
 *  500: String
 * }
 */
router.get("", async (_, res) => {
    try {
        const plans = await Plan.find();
        return res.send(plans);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});


/**
 * Retrieves a specific plan
 * @returns {
 *  200: Plan,
 *  500: String
 * }
 */
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    if (!isValidIdentifier(id)) {
        return res.status(404).send();
    }

    try {
        const plans = await Plan.findOne({ _id: req.params.id });
        return res.send(plans);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

/**
 * Creates / Replaces an existing plan.
 * @see /models/plan.model.js for schema
 * @returns {
 *   200: Plan,
 *   500: String
 * }
 *   
 */
router.post("", async (req, res) => {
    try {
        const plan = new Plan(req.body);
        const newPlan = await plan.save();
        return res.send(newPlan);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

/**
 * Updates an existing plan. Allows partial updates.
 * @see /models/plan.model.js
 * @returns {
 *  200: Plan,
 *  500: String
 * }
 */
router.patch("/:id", async (req, res) => {
    const plan = req.body;
    try {
        const updatedPlan = await Plan.findByIdAndUpdate(req.params.id, plan, { returnDocument: "after"});
        return res.send(updatedPlan);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});


/**
 * Deletes an existing plan.
 * @returns {
 *  200: Plan,
 *  500: String
 * }
 */
router.delete("/:id", async (req, res) => {
    try {
        const query = await Plan.findByIdAndDelete(req.params.id);
        return res.send(query);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

module.exports = router;