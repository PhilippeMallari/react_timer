const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LoggingSchema = new Schema(
	{
		startTime: { type: String },
		stopTime: { type: String },
		remaining: { type: String }
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model("Log", LoggingSchema);
