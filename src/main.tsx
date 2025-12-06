import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { registerServiceWorker } from "./lib/service-worker";

createRoot(document.getElementById("root")!).render(<App />);

// Register service worker for long-term asset caching
registerServiceWorker();
