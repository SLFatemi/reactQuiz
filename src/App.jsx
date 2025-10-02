import ErrorC from "./components/ErrorC.jsx";
import FinishScreen from "./components/FinishScreen.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Loader from "./components/Loader.jsx";
import Main from "./components/Main.jsx";
import NextBtn from "./components/NextBtn.jsx";
import Progress from "./components/Progress.jsx";
import Question from "./components/Question.jsx";
import StartScreen from "./components/StartScreen.jsx";
import Timer from "./components/Timer.jsx";
import { useQuiz } from "./context/QuizProvider.jsx";

function App() {
	const { status } = useQuiz();

	return (
		<div className={"app"}>
			<Header />
			<Main>
				{status === "Loading" && <Loader />}
				{status === "Error" && <ErrorC />}
				{status === "Ready" && <StartScreen />}
				{status === "Active" && (
					<>
						<Progress />
						<Question />
						<Footer>
							<Timer />
							<NextBtn />
						</Footer>
					</>
				)}
				{status === "Finished" && <FinishScreen />}
			</Main>
		</div>
	);
}

export default App;
