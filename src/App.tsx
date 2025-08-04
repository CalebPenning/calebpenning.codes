import Header from "./components/header/header"
import Home from "./components/pages/Home"
import About from "./components/pages/About"
import Projects from "./components/pages/Projects"
import Contact from "./components/pages/Contact"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
	return (
		<Router>
			<div className="min-h-screen w-full">
				<Header />
				<main className="relative">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="/projects" element={<Projects />} />
						<Route path="/contact" element={<Contact />} />
					</Routes>
				</main>
			</div>
		</Router>
	)
}

export default App
