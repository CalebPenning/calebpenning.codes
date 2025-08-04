import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { BrowserRouter as Router } from "react-router-dom"
import Header from "./header"

const renderWithRouter = (component: React.ReactNode) => {
	return render(<Router>{component}</Router>)
}

describe("Header component", () => {
	it("should render", () => {
		renderWithRouter(<Header />)
		expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument()
		expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument()
		expect(screen.getByRole("link", { name: "Projects" })).toBeInTheDocument()
		expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument()
		expect(screen.getByText("Caleb Penning")).toBeInTheDocument()
	})

	it("should have active styles when on the home page", () => {
		renderWithRouter(<Header />)
		expect(screen.getByRole("link", { name: "Home" })).toHaveClass(
			"text-white font-semibold scale-105",
		)
	})
})
