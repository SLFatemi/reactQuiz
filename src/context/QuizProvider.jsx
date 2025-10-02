import { createContext, useContext, useEffect, useReducer } from "react";
import { useFetch } from "../hooks/useFetch.jsx";

const QuizContext = createContext({});
const initialState = {
	questions: [],
	// Loading, Error, Ready, Active, Finished
	status: "Loading",
	index: 0,
	userAnswer: null,
	points: 0,
	highscore: 0,
	secondsRemaining: null,
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
			return {
				...state,
				status: "Active",
				secondsRemaining: state.questions.length * 20,
			};
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
			if (state.index >= state.questions.length - 1)
				// Finished State :P
				return {
					...state,
					status: "Finished",
					highscore: Math.max(state.highscore, state.points),
					secondsRemaining: initialState.secondsRemaining,
				};

			return { ...state, index: state.index + 1, userAnswer: null };
		case "restart":
			return {
				...state,
				index: 0,
				points: 0,
				status: "Ready",
				userAnswer: null,
			};
		case "tick":
			if (state.secondsRemaining <= 0)
				return {
					...state,
					status: "Finished",
					highscore: Math.max(state.highscore, state.points),
					secondsRemaining: initialState.secondsRemaining,
				};
			return { ...state, secondsRemaining: state.secondsRemaining - 1 };
	}
}

function QuizProvider({ children }) {
	const [
		{
			questions,
			status,
			index,
			userAnswer,
			points,
			highscore,
			secondsRemaining,
		},
		dispatch,
	] = useReducer(reducer, initialState);

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

	return (
		<QuizContext.Provider
			value={{
				questions,
				status,
				index,
				userAnswer,
				points,
				highscore,
				secondsRemaining,
				maxPoints,
				questionsCount,
				dispatch,
			}}
		>
			{children}
		</QuizContext.Provider>
	);
}

function useQuiz() {
	const context = useContext(QuizContext);
	if (!context) throw new Error("Rejected");
	return context;
}

export { QuizProvider, useQuiz };
