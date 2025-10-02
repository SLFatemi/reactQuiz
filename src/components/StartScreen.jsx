import { useQuiz } from "../context/QuizProvider.jsx";

function StartScreen() {
	const { questionsCount, dispatch } = useQuiz();

	return (
		<div className={"start"}>
			<h2>Welcome to the React Quiz!</h2>
			<h3>{questionsCount} questions to test your React mastery</h3>
			<button
				className={"btn btn-ui"}
				type={"button"}
				onClick={() => dispatch({ type: "start" })}
			>
				Let's start
			</button>
		</div>
	);
}

export default StartScreen;
