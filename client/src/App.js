import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Timer from "./components/Timer";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
const client = new ApolloClient({ uri: "http://localhost:8000/graphql" });

function App() {
	return (
		<div className="App">
			<h1>React Stopwatch</h1>

			<ApolloProvider client={client}>
				<Timer />;
			</ApolloProvider>
		</div>
	);
}

export default App;
