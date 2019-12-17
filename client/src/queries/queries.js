import { gql } from "apollo-boost";

const getLoggingsQuery = gql`
	{
		getLogs {
			id
			stopTime
			startTime
			remaining
		}
	}
`;

const getLoggingQuery = gql`
	query($id: ID) {
		getLog(id: $id) {
			id
			stopTime
			startTime
			remaining
		}
	}
`;

export { getLoggingsQuery, getLoggingQuery };
