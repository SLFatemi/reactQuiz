import { useEffect } from "react";

function Timer({ secondsRemaining, dispatch }) {
	const min = Math.floor(secondsRemaining / 60);
	const secs = secondsRemaining % 60;
	useEffect(() => {
		const timer = setInterval(() => {
			dispatch({ type: "tick" });
		}, 1000);

		return () => clearInterval(timer);
	}, [dispatch]);

	return (
		<div className={"timer"}>
			{`${min}`.padStart(2, "0")}:{`${secs}`.padStart(2, "0")}
		</div>
	);
}

export default Timer;
