import { gql } from "apollo-boost";

const createLoggingMutation = gql`
	mutation($startTime: String, $stopTime: String, $remaining: String) {
		createLog(
			startTime: $startTime
			stopTime: $stopTime
			remaining: $remaining
		) {
			id
			startTime
			stopTime
			remaining
		}
	}
`;

const updateLoggingMutation = gql`
	mutation(
		$id: ID!
		$startTime: String
		$stopTime: String
		$remaining: String
	) {
		updateLog(
			id: $id
			startTime: $startTime
			stopTime: $stopTime
			remaining: $remaining
		) {
			id
			startTime
			stopTime
			remaining
		}
	}
`;

const deleteLogMutation = gql`
	mutation($id: ID!) {
		deleteLog(id: $id)
	}
`;

export { createLoggingMutation, updateLoggingMutation, deleteLogMutation };
