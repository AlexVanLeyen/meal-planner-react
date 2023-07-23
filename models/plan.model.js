const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    meals: [{ 
        name: {
            type: String,
            required: true
        },
        instructions: String
    }]
});

const PlanModel = mongoose.model("plans", planSchema);
module.exports = PlanModel;
