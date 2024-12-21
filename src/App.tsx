import Header from "./components/header/header"
import clsx from "clsx"
import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

export type Theme = "light" | "dark"

function App() {
	const [theme, setTheme] = useState<Theme>("light")
	const bodyStyles = clsx("w-full", { dark: theme === "dark" })
	return (
		<Router>
			<div className={bodyStyles}>
				<Header theme={theme} setTheme={setTheme} />
				<Routes>
					<Route path="/" Component={() => <div>Home</div>} />
					<Route path="/links" Component={() => <div>Links</div>} />
					<Route path="/contact" Component={() => <div>Contact</div>} />
				</Routes>
			</div>
		</Router>
	)
}

export default App
