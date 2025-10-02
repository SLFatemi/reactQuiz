import { useQuiz } from "../context/QuizProvider.jsx";

function Progress() {
	const { maxPoints, points, questionsCount, index, userAnswer } = useQuiz();
	return (
		<header className={"progress"}>
			<progress
				max={questionsCount}
				value={index + (userAnswer !== null)}
			></progress>
			<p>
				Question <strong>{index + 1}</strong> / {questionsCount}
			</p>
			<p>
				<strong>{points}</strong> /{maxPoints}
			</p>
		</header>
	);
}

export default Progress;
