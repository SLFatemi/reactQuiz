function FinishScreen({ points, maxPoints, highscore, dispatch }) {
	const percentage = (points / maxPoints) * 100;
	const emojiArray = ["🥇", "🎉", "🙃", "🤨", "🤦‍♂️"];

	return (
		<>
			<p className={"result"}>
				<span>{emojiArray[4 - Math.floor(percentage / 20)]}</span>You scored{" "}
				<strong>{points}</strong> out of {maxPoints} ({percentage.toFixed(1)}%)
			</p>
			<p className={"highscore"}>(Highscore : {highscore} Points)</p>
			<button
				type={"button"}
				className={"btn btn-ui"}
				onClick={() => dispatch({ type: "restart" })}
			>
				Restart Quiz
			</button>
		</>
	);
}

export default FinishScreen;
