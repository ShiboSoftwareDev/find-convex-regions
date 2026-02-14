import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

function App() {
  return null
}

const rootElement = document.getElementById("root")

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
