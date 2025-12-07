import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Error handling for root element
const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Root element not found!");
  document.body.innerHTML = '<div style="padding: 2rem; text-align: center; font-family: sans-serif;"><h1>Application Error</h1><p>Root element not found. Please refresh the page.</p></div>';
} else {
  try {
    const root = createRoot(rootElement);
    root.render(<App />);
  } catch (error) {
    console.error("Failed to render React app:", error);
    rootElement.innerHTML = `
      <div style="padding: 2rem; text-align: center; font-family: sans-serif;">
        <h1>Application Error</h1>
        <p>Failed to load the application. Please refresh the page.</p>
        <p style="color: #666; font-size: 0.9rem;">Error: ${error instanceof Error ? error.message : String(error)}</p>
      </div>
    `;
  }
}
