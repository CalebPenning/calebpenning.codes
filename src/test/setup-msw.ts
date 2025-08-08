import { afterAll, afterEach, beforeAll } from "vitest"
import { setupServer } from "msw/node"
import { http, HttpResponse } from "msw"

export const handlers = [
	http.get("http://localhost:3000/api/weather/current", ({ request }) => {
		const url = new URL(request.url)
		const query = url.searchParams.get("query")

		if (query === "error") {
			return HttpResponse.json(
				{ error: "Weather data not found" },
				{ status: 404 },
			)
		}

		if (query === "timeout") {
			return HttpResponse.json({ error: "Request timeout" }, { status: 408 })
		}

		return HttpResponse.json({
			result: {
				location: {
					name: query === "New York" ? "New York" : "San Francisco",
					region: query === "New York" ? "New York" : "California",
					country: "United States",
				},
				current: {
					temp_f: query === "New York" ? 68 : 72,
					condition: {
						text: query === "New York" ? "Sunny" : "Partly cloudy",
						icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
					},
					humidity: 65,
					wind_mph: 8,
					feelslike_f: 75,
					uv: 6,
				},
			},
		})
	}),

	// generic test API handlers
	http.get("http://test.com/api", () => {
		return HttpResponse.json({ result: "success" })
	}),

	http.get("http://test.com/error", () => {
		return HttpResponse.json({ error: "Server error" }, { status: 500 })
	}),

	http.get("http://test.com/api1", () => {
		return HttpResponse.json({ result: "first" })
	}),

	http.get("http://test.com/api2", () => {
		return HttpResponse.json({ result: "second" })
	}),
]

// msw server
export const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
