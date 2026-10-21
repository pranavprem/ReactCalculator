import { createRoot } from "react-dom/client";
import Layout from "./components/Layout.js";

const app = document.getElementById("app");
if (!app) {
  throw new Error("Missing #app element");
}

createRoot(app).render(<Layout />);
