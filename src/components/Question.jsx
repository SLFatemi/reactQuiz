import Option from "./Option.jsx";

function Question({ questions, index }) {
	const question = questions.at(index);
	return (
		<div>
			<h4>{question.question}</h4>
			<div className="options">
				{question.options.map((option) => (
					<Option key={option} option={option} />
				))}
			</div>
		</div>
	);
}

export default Question;
