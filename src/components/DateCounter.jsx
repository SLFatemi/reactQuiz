import { useReducer } from "react";

const initialState = { count: 0, step: 1 };
function reducer(state, action) {
	// action => {type: '', payload: ''}

	switch (action.type) {
		case "inc":
			return { ...state, count: state.count + state.step };
		case "dec":
			return { ...state, count: state.count - state.step };
		case "setCount":
			return { ...state, count: action.payload };
		case "setStep":
			return { ...state, step: action.payload };
		case "reset":
			return initialState;
		default:
			throw new Error();
	}
}

function DateCounter() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { count, step } = state;

	// This mutates the date object.
	const date = new Date();
	date.setDate(date.getDate() + count);

	const dec = () => {
		dispatch({ type: "dec" });
	};

	const inc = () => {
		dispatch({ type: "inc" });
	};

	const defineCount = (e) => {
		dispatch({ type: "setCount", payload: +e.target.value });
	};

	const defineStep = (e) => {
		dispatch({ type: "setStep", payload: +e.target.value });
	};

	const reset = () => {
		dispatch({ type: "reset" });
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
