const express = require("express");
const Plan = require("../models/plan.model");
const router = express.Router();

router.get("", async (_, res) => {
    try {
        const plans = await Plan.find();
        return res.send(plans);
    } catch (error) {
        return res.send(error.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const plans = await Plan.findOne({ _id: req.params.id });
        return res.send(plans);
    } catch (error) {
        return res.send(error.message);
    }
});

router.post("", async (req, res) => {
    const plan = req.body;
    try {
        const newPlan = new Plan(plan);
        await newPlan.save();
        return res.send(plan);
    } catch (error) {
        return res.send(error.message);
    }
});

router.put("/:id", async (req, res) => {
    const plan = req.body;
    try {
        const updatedPlan = await Plan.findByIdAndUpdate(req.params.id, plan, { returnDocument: "after"});
        return res.send(updatedPlan);
    } catch (error) {
        return res.send(error.message);
    }
});

router.delete("/:id", async (req, res) => {
    res.status(501).send("Not Implemented");
});

module.exports = router;