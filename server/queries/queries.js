const { ApolloServer, gql } = require("apollo-server-express");

const Log = require("../models/Log");

const typeDefs = gql`
	type LogType {
		id: ID
		startTime: String
		stopTime: String
		remaining: String
	}

	type Mutation {
		createLog(
			startTime: String
			stopTime: String
			remaining: String
		): LogType

		updateLog(
			id: ID!
			startTime: String
			stopTime: String
			remaining: String
		): LogType

		deleteLog(id: ID!): Boolean
	}

	type Query {
		getLogs: [LogType]
		getLog(id: ID): LogType
	}
`;

const resolvers = {
	Query: {
		getLogs: () => {
			return Log.find({});
		},
		getLog: (_, { id }) => {
			return Log.findById(id);
		}
	},

	Mutation: {
		createLog: (_, { startTime, stopTime, remaining }) => {
			let newLog = new Log({
				startTime: startTime,
				stopTime: stopTime,
				remaining: remaining
			});
			return newLog.save();
		},

		updateLog: (_, { id, startTime, stopTime, remaining }) => {
			return Log.findByIdAndUpdate(id, {
				$set: {
					stopTime: stopTime,
					remaining: remaining
				}
			});
		},

		deleteLog: (_, { id }) => {
			return Log.findByIdAndDelete(id).then((logging, err) => {
				if (err || !logging) {
					return false;
				} else {
					return true;
				}
			});
		}
	}
};

// create an instance of apollo server
const server = new ApolloServer({
	typeDefs,
	resolvers
});

// export module
module.exports = server;
