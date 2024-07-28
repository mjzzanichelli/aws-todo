import "./amplify";
import "./polyfills";
import "./fonts/index.css";
import "./components/icon/customicons/style/customicons.css";
import ReactDOM from "react-dom/client";
import { App } from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
