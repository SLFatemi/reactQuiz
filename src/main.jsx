import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QuizProvider } from "./context/QuizProvider.jsx";

// import Challenge from "./components/Challenge.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<QuizProvider>
			<App />
		</QuizProvider>
		{/*<Challenge />*/}
	</StrictMode>,
);
