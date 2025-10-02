import { useQuiz } from "../context/QuizProvider.jsx";
import Option from "./Option.jsx";

function Question() {
	const { questions, index, dispatch, userAnswer } = useQuiz();
	const question = questions.at(index);
	return (
		<div>
			<h4>{question.question}</h4>
			<div className="options">
				{question.options.map((option, i) => (
					<Option
						userAnswer={userAnswer}
						dispatch={dispatch}
						key={option}
						option={option}
						correctOption={question.correctOption}
						index={i}
					/>
				))}
			</div>
		</div>
	);
}

export default Question;
