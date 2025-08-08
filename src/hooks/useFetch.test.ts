import { renderHook, waitFor, act } from "@testing-library/react"
import { describe, it, expect, beforeEach } from "vitest"
import { http, HttpResponse } from "msw"
import { server } from "../test/setup-msw"
import { useFetch } from "./useFetch"

describe("useFetch with MSW", () => {
	beforeEach(() => {
		localStorage.clear()
	})

	describe("Basic functionality", () => {
		it("should fetch data successfully", async () => {
			const { result } = renderHook(() =>
				useFetch("http://test.com/api", { enabled: true }),
			)

			expect(result.current.loading).toBe(true)
			expect(result.current.data).toBe(null)
			expect(result.current.error).toBe(null)

			await waitFor(() => {
				expect(result.current.loading).toBe(false)
			})

			expect(result.current.data).toEqual({ result: "success" })
			expect(result.current.error).toBe(null)
		})

		it("should handle HTTP errors", async () => {
			const { result } = renderHook(() =>
				useFetch("http://test.com/error", { enabled: true }),
			)

			await waitFor(() => {
				expect(result.current.loading).toBe(false)
			})

			expect(result.current.data).toBe(null)
			expect(result.current.error).toBe("HTTP 500: Internal Server Error")
		})

		it("should not fetch when disabled", () => {
			const { result } = renderHook(() =>
				useFetch("http://test.com/api", { enabled: false }),
			)

			expect(result.current.loading).toBe(false)
			expect(result.current.data).toBe(null)
			expect(result.current.error).toBe(null)
		})

		it("should not fetch when url is null", () => {
			const { result } = renderHook(() => useFetch(null, { enabled: true }))

			expect(result.current.loading).toBe(false)
			expect(result.current.data).toBe(null)
			expect(result.current.error).toBe(null)
		})
	})

	describe("Refetch functionality", () => {
		it("should refetch data when refetch is called", async () => {
			// Setup different responses for different calls
			let callCount = 0
			server.use(
				http.get("http://test.com/refetch", () => {
					callCount++
					return HttpResponse.json({
						result: callCount === 1 ? "first" : "second",
					})
				}),
			)

			const { result } = renderHook(() =>
				useFetch("http://test.com/refetch", { enabled: true }),
			)

			await waitFor(() => {
				expect(result.current.data).toEqual({ result: "first" })
			})

			act(() => {
				result.current.refetch()
			})

			expect(result.current.isRefetching).toBe(true)

			await waitFor(() => {
				expect(result.current.isRefetching).toBe(false)
			})

			expect(result.current.data).toEqual({ result: "second" })
		})
	})

	describe("Caching", () => {
		it("should cache data between hook instances", async () => {
			// First hook instance
			const { result: result1, unmount } = renderHook(() =>
				useFetch("http://test.com/api", {
					enabled: true,
					cacheTime: 60000,
				}),
			)

			await waitFor(() => {
				expect(result1.current.data).toEqual({ result: "success" })
			})

			unmount()

			// Second hook instance should use cached data immediately
			const { result: result2 } = renderHook(() =>
				useFetch("http://test.com/api", {
					enabled: true,
					cacheTime: 60000,
				}),
			)

			// Should have cached data immediately (no loading state)
			expect(result2.current.loading).toBe(false)
			expect(result2.current.data).toEqual({ result: "success" })
		})

		it("should bypass cache when refetching", async () => {
			let callCount = 0
			server.use(
				http.get("http://test.com/cache-bypass", () => {
					callCount++
					return HttpResponse.json({
						result: callCount === 1 ? "cached" : "fresh",
					})
				}),
			)

			const { result } = renderHook(() =>
				useFetch("http://test.com/cache-bypass", {
					enabled: true,
					cacheTime: 60000,
				}),
			)

			await waitFor(() => {
				expect(result.current.data).toEqual({ result: "cached" })
			})

			// Refetch should bypass cache and get fresh data
			act(() => {
				result.current.refetch()
			})

			await waitFor(() => {
				expect(result.current.data).toEqual({ result: "fresh" })
			})
		})
	})

	describe("URL changes", () => {
		it("should fetch new data when URL changes", async () => {
			const { result, rerender } = renderHook(
				({ url }) => useFetch(url, { enabled: true }),
				{ initialProps: { url: "http://test.com/api1" } },
			)

			await waitFor(() => {
				expect(result.current.data).toEqual({ result: "first" })
			})

			rerender({ url: "http://test.com/api2" })

			await waitFor(() => {
				expect(result.current.data).toEqual({ result: "second" })
			})
		})
	})

	describe("Weather API integration", () => {
		it("should fetch weather data correctly", async () => {
			const { result } = renderHook(() =>
				useFetch(
					"http://localhost:3000/api/weather/current?query=San Francisco",
					{
						enabled: true,
					},
				),
			)

			await waitFor(() => {
				expect(result.current.loading).toBe(false)
			})

			expect(result.current.data).toEqual({
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
			})
			expect(result.current.error).toBe(null)
		})

		it("should handle weather API errors", async () => {
			const { result } = renderHook(() =>
				useFetch("http://localhost:3000/api/weather/current?query=error", {
					enabled: true,
				}),
			)

			await waitFor(() => {
				expect(result.current.loading).toBe(false)
			})

			expect(result.current.data).toBe(null)
			expect(result.current.error).toBe("HTTP 404: Not Found")
		})

		it("should fetch different locations correctly", async () => {
			const { result, rerender } = renderHook(
				({ location }) =>
					useFetch(
						`http://localhost:3000/api/weather/current?query=${encodeURIComponent(location)}`,
						{ enabled: true },
					),
				{ initialProps: { location: "San Francisco" } },
			)

			await waitFor(() => {
				expect(result.current.data?.result.location.name).toBe("San Francisco")
			})

			rerender({ location: "New York" })

			await waitFor(() => {
				expect(result.current.data?.result.location.name).toBe("New York")
			})
		})
	})

	describe("Network error handling", () => {
		it("should handle network errors gracefully", async () => {
			server.use(
				http.get("http://test.com/network-error", () => {
					return HttpResponse.error()
				}),
			)

			const { result } = renderHook(() =>
				useFetch("http://test.com/network-error", { enabled: true }),
			)

			await waitFor(() => {
				expect(result.current.loading).toBe(false)
			})

			expect(result.current.data).toBe(null)
			expect(result.current.error).toContain("Failed to fetch")
		})
	})
})
