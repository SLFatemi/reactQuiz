import { useEffect, useReducer } from "react";
import { useFetch } from "./assets/hooks/useFetch.jsx";
import ErrorC from "./components/ErrorC.jsx";
import Header from "./components/Header.jsx";
import Loader from "./components/Loader.jsx";
import Main from "./components/Main.jsx";
import NextBtn from "./components/NextBtn.jsx";
import Progress from "./components/Progress.jsx";
import Question from "./components/Question.jsx";
import StartScreen from "./components/StartScreen.jsx";

const initialState = {
	questions: [],

	// Loading, Error, Ready, Active, Finished
	status: "Loading",
	index: 0,
	userAnswer: null,
	points: 0,
};

function reducer(state, action) {
	switch (action.type) {
		case "dataReceived":
			return { ...state, questions: action.payload, status: "Ready" };
		case "isLoading":
			return { ...state, status: "Loading" };
		case "error":
			return { ...state, status: "Error" };
		case "start":
			return { ...state, status: "Active" };
		case "newAnswer": {
			const question = state.questions.at(state.index);

			return {
				...state,
				userAnswer: action.payload,
				points:
					action.payload === question.correctOption
						? state.points + question.points
						: state.points,
			};
		}
		case "nextQuestion":
			return { ...state, index: state.index + 1, userAnswer: null };
	}
}
function App() {
	const [{ questions, status, index, userAnswer, points }, dispatch] =
		useReducer(reducer, initialState);
	const { data, loading, error } = useFetch("http://localhost:8000/questions");
	const questionsCount = questions.length;
	const maxPoints = questions.reduce(
		(acc, question) => acc + question.points,
		0,
	);

	useEffect(() => {
		if (loading) {
			dispatch({ type: "isLoading" });
		} else if (error) {
			dispatch({ type: "error", payload: "" });
		} else if (data) {
			dispatch({ type: "dataReceived", payload: data });
		}
	}, [data, loading, error]);

	console.log(status);
	return (
		<div className={"app"}>
			<Header />
			<Main>
				{status === "Loading" && <Loader />}
				{status === "Error" && <ErrorC />}
				{status === "Ready" && (
					<StartScreen questionsCount={questionsCount} dispatch={dispatch} />
				)}
				{status === "Active" && (
					<>
						<Progress
							userAnswer={userAnswer}
							index={index}
							questionsCount={questionsCount}
							points={points}
							maxPoints={maxPoints}
						/>
						<Question
							userAnswer={userAnswer}
							dispatch={dispatch}
							index={index}
							questions={questions}
						/>
						<NextBtn userAnswer={userAnswer} dispatch={dispatch} />
					</>
				)}
			</Main>
		</div>
	);
}

export default App;
