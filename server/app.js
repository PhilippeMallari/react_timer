const express = require("express");

const app = express();

const port = process.env.PORT || 8000;
const mongoose = require("mongoose");
const server = require("./queries/queries.js");

mongoose.connect(
	"mongodb+srv://philippemallari:Toodope04@cluster0-srijx.mongodb.net/react_timer?retryWrites=true&w=majority",
	{ useNewUrlParser: true }
);

mongoose.connection.once("open", () => {
	console.log("Now connected to the online Mongodb server");
});

server.applyMiddleware({
	app,
	path: "/graphql"
});

app.listen(port, () => {
	console.log(
		`🚀 Server ready at http://localhost:${port + server.graphqlPath}`
	);
});
