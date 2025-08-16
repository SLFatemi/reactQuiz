import { useReducer, useState } from "react";

function reducer(curState, action) {
	if (action.type === "inc") return curState + action.payload;
	if (action.type === "dec") return curState - action.payload;
	if (action.type === "setCount") return action.payload;
}

function DateCounter() {
	const [count, dispatch] = useReducer(reducer, 0);
	const [step, setStep] = useState(1);

	// This mutates the date object.
	const date = new Date("june 21 2027");
	date.setDate(date.getDate() + count);

	const dec = () => {
		// setCount((count) => count - step);
		dispatch({ type: "dec", payload: 1 });
	};

	const inc = () => {
		// setCount((count) => count + step);
		dispatch({ type: "inc", payload: 1 });
	};

	const defineCount = (e) => {
		dispatch({ type: "setCount", payload: +e.target.value });
	};

	const defineStep = (e) => {
		setStep(Number(e.target.value));
	};

	const reset = () => {
		// setCount(0);
		setStep(1);
	};

	return (
		<div className="counter">
			<div>
				<input
					type="range"
					min="0"
					max="10"
					value={step}
					onChange={defineStep}
				/>
				<span>{step}</span>
			</div>

			<div>
				<button type={"button"} onClick={dec}>
					-
				</button>
				<input value={count} onChange={defineCount} />
				<button type={"button"} onClick={inc}>
					+
				</button>
			</div>

			<p>{date.toDateString()}</p>

			<div>
				<button type={"button"} onClick={reset}>
					Reset
				</button>
			</div>
		</div>
	);
}
export default DateCounter;
