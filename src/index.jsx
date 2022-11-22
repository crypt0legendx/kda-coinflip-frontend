import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { Provider } from "react-redux"
import store from "./store/store.js"
import ThemeProvider from "./contexts/ThemeContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
