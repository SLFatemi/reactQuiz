import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Challenge from "./components/Challenge.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		{/*<App />*/}
		<Challenge />
	</StrictMode>,
);
