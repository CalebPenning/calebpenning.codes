import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { BrowserRouter as Router } from "react-router-dom"
import Header from "./header"

const renderWithRouter = (component: React.ReactNode) => {
	return render(<Router>{component}</Router>)
}

describe("Header component", () => {
	it("should render", () => {
		renderWithRouter(<Header theme="light" setTheme={() => {}} />)
		expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument()
		expect(screen.getByRole("link", { name: "Links" })).toBeInTheDocument()
		expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument()
		expect(
			screen.getByRole("button", { name: "Toggle Dark Mode" }),
		).toBeInTheDocument()
	})

	it("should have active styles when on the home page", () => {
		renderWithRouter(<Header theme="light" setTheme={() => {}} />)
		expect(screen.getByRole("link", { name: "Home" })).toHaveClass(
			"text-sky-700 dark:text-slate-200",
		)
	})
})
