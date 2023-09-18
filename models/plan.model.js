const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    author: { type: {
        name: { type: String, required: true },
    }, required: true},
    meals: { type: [{
        date: { type: Date, required: true },
        type: { type: String, required: true }, 
        name: { type: String, required: true },
        notes: { type: [{
            message: { type: String, required: true }
        }], required: true }
    }], required: true }
});

const PlanModel = mongoose.model("plans", planSchema);
module.exports = PlanModel;
