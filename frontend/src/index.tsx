import ReactDOM from "react-dom/client";
import App from "./app/App";
import Context from "./Context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
<Context>
  <App />
</Context>
);