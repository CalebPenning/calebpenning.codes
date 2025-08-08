import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import {
	vi,
	describe,
	it,
	expect,
	beforeEach,
	type MockedFunction,
} from "vitest"
import WeatherWidget from "./WeatherWidget"

// Mock the useFetch hook
vi.mock("../hooks/useFetch", () => ({
	useFetch: vi.fn(),
}))

import { useFetch } from "../hooks/useFetch"
const mockUseFetch = useFetch as MockedFunction<typeof useFetch>

describe("WeatherWidget", () => {
	const mockWeatherResponse = {
		result: {
			location: {
				name: "San Francisco",
				region: "California",
				country: "United States",
			},
			current: {
				temp_f: 72,
				condition: {
					text: "Partly cloudy",
					icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
				},
				humidity: 65,
				wind_mph: 8,
				feelslike_f: 75,
				uv: 6,
			},
		},
	}

	beforeEach(() => {
		mockUseFetch.mockClear()
	})

	describe("Loading state", () => {
		it("should display loading state initially", () => {
			mockUseFetch.mockReturnValue({
				data: null,
				loading: true,
				error: null,
				refetch: vi.fn(),
				isRefetching: false,
			})

			render(<WeatherWidget />)

			expect(screen.getByText("Fetching weather magic...")).toBeInTheDocument()
			expect(screen.getByText("🌈")).toBeInTheDocument()
		})

		it("should display loading animation elements", () => {
			mockUseFetch.mockReturnValue({
				data: null,
				loading: true,
				error: null,
				refetch: vi.fn(),
				isRefetching: false,
			})

			const { container } = render(<WeatherWidget />)

			expect(container.querySelector(".shimmer")).toBeInTheDocument()
			expect(container.querySelector(".pulse-glow")).toBeInTheDocument()
			expect(container.querySelector(".float-animation")).toBeInTheDocument()
		})
	})

	describe("Error state", () => {
		it("should display error message when fetch fails", () => {
			const mockRefetch = vi.fn()
			mockUseFetch.mockReturnValue({
				data: null,
				loading: false,
				error: "Unable to fetch weather data",
				refetch: mockRefetch,
				isRefetching: false,
			})

			render(<WeatherWidget />)

			expect(
				screen.getByText("Unable to fetch weather data"),
			).toBeInTheDocument()
			expect(screen.getByText("🌊")).toBeInTheDocument()

			const tryAgainButton = screen.getByRole("button", { name: "Try Again" })
			expect(tryAgainButton).toBeInTheDocument()

			fireEvent.click(tryAgainButton)
			expect(mockRefetch).toHaveBeenCalledTimes(1)
		})
	})

	describe("Success state", () => {
		it("should display weather data correctly", () => {
			mockUseFetch.mockReturnValue({
				data: mockWeatherResponse,
				loading: false,
				error: null,
				refetch: vi.fn(),
				isRefetching: false,
			})

			render(<WeatherWidget />)

			expect(screen.getByText("San Francisco, California")).toBeInTheDocument()
			expect(screen.getByText("72°F")).toBeInTheDocument()
			expect(screen.getByText("Feels like 75°F")).toBeInTheDocument()
			expect(screen.getByText("Partly cloudy")).toBeInTheDocument()
			expect(screen.getByText("65%")).toBeInTheDocument() // Humidity
			expect(screen.getByText("8 mph")).toBeInTheDocument() // Wind speed
			expect(screen.getByText("6")).toBeInTheDocument() // UV index
		})

		it("should display correct weather emoji for different conditions", () => {
			const testCases = [
				{ condition: "Sunny", expectedEmoji: "☀️" },
				{ condition: "Partly cloudy", expectedEmoji: "⛅" },
				{ condition: "Cloudy", expectedEmoji: "☁️" },
				{ condition: "Rain", expectedEmoji: "🌧️" },
				{ condition: "Thunderstorm", expectedEmoji: "⛈️" },
				{ condition: "Snow", expectedEmoji: "❄️" },
				{ condition: "Fog", expectedEmoji: "🌫️" },
				{ condition: "Clear", expectedEmoji: "☀️" },
				{ condition: "Unknown condition", expectedEmoji: "🌤️" },
			]

			testCases.forEach(({ condition, expectedEmoji }) => {
				const mockData = {
					...mockWeatherResponse,
					result: {
						...mockWeatherResponse.result,
						current: {
							...mockWeatherResponse.result.current,
							condition: {
								...mockWeatherResponse.result.current.condition,
								text: condition,
							},
						},
					},
				}

				mockUseFetch.mockReturnValue({
					data: mockData,
					loading: false,
					error: null,
					refetch: vi.fn(),
					isRefetching: false,
				})

				const { unmount, container } = render(<WeatherWidget />)
				// Look specifically for the main weather emoji in the large icon area
				const mainWeatherIcon = container.querySelector(
					".float-animation.text-7xl",
				)
				expect(mainWeatherIcon).toHaveTextContent(expectedEmoji)
				unmount()
			})
		})

		it("should handle refresh button click", () => {
			const mockRefetch = vi.fn()
			mockUseFetch.mockReturnValue({
				data: mockWeatherResponse,
				loading: false,
				error: null,
				refetch: mockRefetch,
				isRefetching: false,
			})

			render(<WeatherWidget />)

			const refreshButton = screen.getByRole("button", { name: "🔄" })
			fireEvent.click(refreshButton)

			expect(mockRefetch).toHaveBeenCalledTimes(1)
		})

		it("should show spinning animation when refreshing", () => {
			mockUseFetch.mockReturnValue({
				data: mockWeatherResponse,
				loading: false,
				error: null,
				refetch: vi.fn(),
				isRefetching: true,
			})

			const { container } = render(<WeatherWidget />)

			const refreshIcon = container.querySelector(".animate-spin")
			expect(refreshIcon).toBeInTheDocument()
		})

		it("should disable refresh button when refreshing", () => {
			mockUseFetch.mockReturnValue({
				data: mockWeatherResponse,
				loading: false,
				error: null,
				refetch: vi.fn(),
				isRefetching: true,
			})

			render(<WeatherWidget />)

			const refreshButton = screen.getByRole("button", { name: "🔄" })
			expect(refreshButton).toBeDisabled()
		})
	})

	describe("Location search", () => {
		it("should have a location input field", () => {
			mockUseFetch.mockReturnValue({
				data: mockWeatherResponse,
				loading: false,
				error: null,
				refetch: vi.fn(),
				isRefetching: false,
			})

			render(<WeatherWidget />)

			const locationInput = screen.getByPlaceholderText("Enter city...")
			expect(locationInput).toBeInTheDocument()
			expect(locationInput).toHaveValue("")
		})

		it("should update location when Enter key is pressed", async () => {
			let capturedUrl = ""
			mockUseFetch.mockImplementation((url) => {
				capturedUrl = url as string
				return {
					data: mockWeatherResponse,
					loading: false,
					error: null,
					refetch: vi.fn(),
					isRefetching: false,
				}
			})

			render(<WeatherWidget />)

			const locationInput = screen.getByPlaceholderText("Enter city...")

			fireEvent.change(locationInput, { target: { value: "New York" } })
			fireEvent.keyDown(locationInput, { key: "Enter", code: "Enter" })

			await waitFor(() => {
				expect(capturedUrl).toContain("New%20York")
			})
		})

		it("should not update location for empty input", async () => {
			let callCount = 0
			mockUseFetch.mockImplementation(() => {
				callCount++
				return {
					data: mockWeatherResponse,
					loading: false,
					error: null,
					refetch: vi.fn(),
					isRefetching: false,
				}
			})

			render(<WeatherWidget />)

			const locationInput = screen.getByPlaceholderText("Enter city...")

			fireEvent.change(locationInput, { target: { value: "   " } })
			fireEvent.keyDown(locationInput, { key: "Enter", code: "Enter" })

			// Should still only be called once (initial render)
			expect(callCount).toBe(1)
		})

		it("should blur input after pressing Enter", () => {
			mockUseFetch.mockReturnValue({
				data: mockWeatherResponse,
				loading: false,
				error: null,
				refetch: vi.fn(),
				isRefetching: false,
			})

			render(<WeatherWidget />)

			const locationInput = screen.getByPlaceholderText("Enter city...")

			// Focus the input first
			locationInput.focus()
			expect(document.activeElement).toBe(locationInput)

			fireEvent.change(locationInput, { target: { value: "Boston" } })
			fireEvent.keyDown(locationInput, { key: "Enter", code: "Enter" })

			// Input should be blurred after Enter
			expect(document.activeElement).not.toBe(locationInput)
		})
	})

	describe("Styling and animations", () => {
		it("should have glassmorphic styling classes", () => {
			mockUseFetch.mockReturnValue({
				data: mockWeatherResponse,
				loading: false,
				error: null,
				refetch: vi.fn(),
				isRefetching: false,
			})

			const { container } = render(<WeatherWidget />)

			expect(container.querySelector(".glass-card")).toBeInTheDocument()
			expect(container.querySelector(".float-animation")).toBeInTheDocument()
			expect(container.querySelector(".gradient-text")).toBeInTheDocument()
		})

		it("should have hover effects and transitions", () => {
			mockUseFetch.mockReturnValue({
				data: mockWeatherResponse,
				loading: false,
				error: null,
				refetch: vi.fn(),
				isRefetching: false,
			})

			const { container } = render(<WeatherWidget />)

			const mainCard = container.querySelector(".group")
			expect(mainCard).toHaveClass(
				"transition-all",
				"duration-500",
				"hover:scale-105",
			)
		})

		it("should have decorative floating elements", () => {
			mockUseFetch.mockReturnValue({
				data: mockWeatherResponse,
				loading: false,
				error: null,
				refetch: vi.fn(),
				isRefetching: false,
			})

			const { container } = render(<WeatherWidget />)

			const decorativeElements = container.querySelectorAll(
				".absolute.rounded-full",
			)
			expect(decorativeElements).toHaveLength(2) // Two floating decorative circles
		})
	})

	describe("Accessibility", () => {
		it("should have accessible form elements", () => {
			mockUseFetch.mockReturnValue({
				data: mockWeatherResponse,
				loading: false,
				error: null,
				refetch: vi.fn(),
				isRefetching: false,
			})

			render(<WeatherWidget />)

			const locationInput = screen.getByRole("textbox")
			expect(locationInput).toBeInTheDocument()

			const refreshButton = screen.getByRole("button", { name: "🔄" })
			expect(refreshButton).toBeInTheDocument()
		})

		it("should handle keyboard navigation", () => {
			mockUseFetch.mockReturnValue({
				data: mockWeatherResponse,
				loading: false,
				error: null,
				refetch: vi.fn(),
				isRefetching: false,
			})

			render(<WeatherWidget />)

			const locationInput = screen.getByRole("textbox")
			const refreshButton = screen.getByRole("button", { name: "🔄" })

			// Both elements should be focusable
			locationInput.focus()
			expect(document.activeElement).toBe(locationInput)

			refreshButton.focus()
			expect(document.activeElement).toBe(refreshButton)
		})
	})
})
