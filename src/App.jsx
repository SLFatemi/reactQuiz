import "./App.css";
import { useEffect, useReducer } from "react";
import { useFetch } from "./assets/hooks/useFetch.jsx";
import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";

const initialState = {
	questions: [],

	// Loading, Error, Ready, Active, Finished
	status: "Loading",
};

function reducer(state, action) {
	switch (action.type) {
		case "dataReceived":
			return { ...state, questions: action.payload, status: "Ready" };
		case "isLoading":
			return { ...state, questions: [], status: "Loading" };
		case "error":
			return { ...state, questions: [], status: "Error" };
	}
}
function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { data, loading, error } = useFetch("http://localhost:8000/questions");

	useEffect(() => {
		if (loading) {
			dispatch({ type: "isLoading" });
		} else if (error) {
			dispatch({ type: "error", payload: error });
		} else if (data) {
			dispatch({ type: "dataReceived", payload: data });
		}
	}, [data, loading, error]);

	return (
		<div className={"app"}>
			<Header />
			<Main>
				<p>1/15</p>
				<p></p>
			</Main>
		</div>
	);
}

export default App;
