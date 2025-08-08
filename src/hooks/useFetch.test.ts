import { renderHook, waitFor } from "@testing-library/react"
import {
	vi,
	describe,
	beforeEach,
	afterEach,
	afterAll,
	it,
	expect,
} from "vitest"
import { act } from "react"
import { useFetch } from "./useFetch"

// Mock fetch globally
const mockFetch = vi.fn()
global.fetch = mockFetch

describe("useFetch", () => {
	beforeEach(() => {
		mockFetch.mockClear()
	})

	describe("Basic functionality", () => {
		it("should fetch data successfully", async () => {
			const mockData = { result: "success" }
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => mockData,
			})

			const { result } = renderHook(() =>
				useFetch("http://test.com/api", { enabled: true }),
			)

			expect(result.current.loading).toBe(true)
			expect(result.current.data).toBe(null)
			expect(result.current.error).toBe(null)

			await waitFor(() => {
				expect(result.current.loading).toBe(false)
			})

			expect(result.current.data).toEqual(mockData)
			expect(result.current.error).toBe(null)
			expect(mockFetch).toHaveBeenCalledTimes(1)
		})

		it("should handle fetch errors", async () => {
			const errorMessage = "Network error"
			mockFetch.mockRejectedValueOnce(new Error(errorMessage))

			const { result } = renderHook(() =>
				useFetch("http://test.com/api", { enabled: true }),
			)

			await waitFor(() => {
				expect(result.current.loading).toBe(false)
			})

			expect(result.current.data).toBe(null)
			expect(result.current.error).toBe(errorMessage)
		})

		it("should handle HTTP errors", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 404,
				statusText: "Not Found",
			})

			const { result } = renderHook(() =>
				useFetch("http://test.com/api", { enabled: true }),
			)

			await waitFor(() => {
				expect(result.current.loading).toBe(false)
			})

			expect(result.current.data).toBe(null)
			expect(result.current.error).toBe("HTTP 404: Not Found")
		})

		it("should not fetch when disabled", async () => {
			const { result } = renderHook(() =>
				useFetch("http://test.com/api", { enabled: false }),
			)

			expect(result.current.loading).toBe(false)
			expect(result.current.data).toBe(null)
			expect(result.current.error).toBe(null)
			expect(mockFetch).not.toHaveBeenCalled()
		})

		it("should not fetch when url is null", async () => {
			const { result } = renderHook(() => useFetch(null, { enabled: true }))

			expect(result.current.loading).toBe(false)
			expect(result.current.data).toBe(null)
			expect(result.current.error).toBe(null)
			expect(mockFetch).not.toHaveBeenCalled()
		})
	})

	describe("Refetch functionality", () => {
		it("should refetch data when refetch is called", async () => {
			const mockData1 = { result: "first" }
			const mockData2 = { result: "second" }

			mockFetch
				.mockResolvedValueOnce({
					ok: true,
					json: async () => mockData1,
				})
				.mockResolvedValueOnce({
					ok: true,
					json: async () => mockData2,
				})

			const { result } = renderHook(() =>
				useFetch("http://test.com/api", { enabled: true }),
			)

			await waitFor(() => {
				expect(result.current.data).toEqual(mockData1)
			})

			act(() => {
				result.current.refetch()
			})

			expect(result.current.isRefetching).toBe(true)

			await waitFor(() => {
				expect(result.current.isRefetching).toBe(false)
			})

			expect(result.current.data).toEqual(mockData2)
			expect(mockFetch).toHaveBeenCalledTimes(2)
		})
	})

	describe("Caching", () => {
		it("should use cached data when available", async () => {
			const mockData = { result: "cached" }
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => mockData,
			})

			// First render
			const { result: result1, unmount } = renderHook(() =>
				useFetch("http://test.com/api", { enabled: true, cacheTime: 60000 }),
			)

			await waitFor(() => {
				expect(result1.current.data).toEqual(mockData)
			})

			unmount()

			// Second render with same URL should use cache
			const { result: result2 } = renderHook(() =>
				useFetch("http://test.com/api", { enabled: true, cacheTime: 60000 }),
			)

			expect(result2.current.loading).toBe(false)
			expect(result2.current.data).toEqual(mockData)
			expect(mockFetch).toHaveBeenCalledTimes(1) // Should not fetch again
		})

		it("should bypass cache when refetching", async () => {
			const mockData1 = { result: "first" }
			const mockData2 = { result: "second" }

			mockFetch
				.mockResolvedValueOnce({
					ok: true,
					json: async () => mockData1,
				})
				.mockResolvedValueOnce({
					ok: true,
					json: async () => mockData2,
				})

			const { result } = renderHook(() =>
				useFetch("http://test.com/api", { enabled: true, cacheTime: 60000 }),
			)

			await waitFor(() => {
				expect(result.current.data).toEqual(mockData1)
			})

			// Refetch should bypass cache
			act(() => {
				result.current.refetch()
			})

			await waitFor(() => {
				expect(result.current.data).toEqual(mockData2)
			})

			expect(mockFetch).toHaveBeenCalledTimes(2)
		})
	})

	describe("URL changes", () => {
		it("should fetch new data when URL changes", async () => {
			const mockData1 = { result: "first" }
			const mockData2 = { result: "second" }

			mockFetch
				.mockResolvedValueOnce({
					ok: true,
					json: async () => mockData1,
				})
				.mockResolvedValueOnce({
					ok: true,
					json: async () => mockData2,
				})

			const { result, rerender } = renderHook(
				({ url }) => useFetch(url, { enabled: true }),
				{ initialProps: { url: "http://test.com/api1" } },
			)

			await waitFor(() => {
				expect(result.current.data).toEqual(mockData1)
			})

			rerender({ url: "http://test.com/api2" })

			await waitFor(() => {
				expect(result.current.data).toEqual(mockData2)
			})

			expect(mockFetch).toHaveBeenCalledTimes(2)
		})
	})

	describe("Abort controller", () => {
		it("should handle aborted requests gracefully", async () => {
			const abortError = new Error("Request aborted")
			abortError.name = "AbortError"

			mockFetch.mockRejectedValueOnce(abortError)

			const { result } = renderHook(() =>
				useFetch("http://test.com/api", { enabled: true }),
			)

			await waitFor(() => {
				expect(result.current.loading).toBe(false)
			})

			// Should not set error for aborted requests
			expect(result.current.error).toBe(null)
			expect(result.current.data).toBe(null)
		})
	})

	describe("Callbacks", () => {
		it("should call onSuccess callback", async () => {
			const mockData = { result: "success" }
			const onSuccess = vi.fn()

			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => mockData,
			})

			renderHook(() =>
				useFetch("http://test.com/api", { enabled: true, onSuccess }),
			)

			await waitFor(() => {
				expect(onSuccess).toHaveBeenCalledWith(mockData)
			})
		})

		it("should call onError callback", async () => {
			const error = new Error("Network error")
			const onError = vi.fn()

			mockFetch.mockRejectedValueOnce(error)

			renderHook(() =>
				useFetch("http://test.com/api", { enabled: true, onError }),
			)

			await waitFor(() => {
				expect(onError).toHaveBeenCalledWith(error)
			})
		})
	})

	describe("Window focus refetching", () => {
		it("should refetch on window focus when enabled", async () => {
			const mockData1 = { result: "first" }
			const mockData2 = { result: "second" }

			mockFetch
				.mockResolvedValueOnce({
					ok: true,
					json: async () => mockData1,
				})
				.mockResolvedValueOnce({
					ok: true,
					json: async () => mockData2,
				})

			const { result } = renderHook(() =>
				useFetch("http://test.com/api", {
					enabled: true,
					refetchOnWindowFocus: true,
				}),
			)

			await waitFor(() => {
				expect(result.current.data).toEqual(mockData1)
			})

			// Simulate window focus
			act(() => {
				window.dispatchEvent(new Event("focus"))
			})

			await waitFor(() => {
				expect(result.current.data).toEqual(mockData2)
			})

			expect(mockFetch).toHaveBeenCalledTimes(2)
		})

		it("should not refetch on window focus when disabled", async () => {
			const mockData = { result: "data" }
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => mockData,
			})

			renderHook(() =>
				useFetch("http://test.com/api", {
					enabled: true,
					refetchOnWindowFocus: false,
				}),
			)

			await waitFor(() => {
				expect(mockFetch).toHaveBeenCalledTimes(1)
			})

			// Simulate window focus
			act(() => {
				window.dispatchEvent(new Event("focus"))
			})

			// Should not fetch again
			expect(mockFetch).toHaveBeenCalledTimes(1)
		})
	})
})
