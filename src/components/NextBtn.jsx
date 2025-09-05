function NextBtn({ dispatch, userAnswer }) {
	const hasAnswered = !(userAnswer === null);
	if (!hasAnswered) return;

	return (
		<button
			type={"button"}
			className={"btn btn-ui"}
			onClick={() => dispatch({ type: "nextQuestion" })}
		>
			Next
		</button>
	);
}

export default NextBtn;
