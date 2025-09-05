function Option({ option, dispatch, userAnswer, index, correctOption }) {
	const hasAnswered = !!userAnswer;
	return (
		<button
			type={"button"}
			className={`btn btn-option ${index === userAnswer ? "answer" : ""} ${hasAnswered ? (index === correctOption ? "correct" : "wrong") : ""}`}
			onClick={() => dispatch({ type: "newAnswer", payload: index })}
			disabled={hasAnswered}
		>
			{option}
		</button>
	);
}

export default Option;
