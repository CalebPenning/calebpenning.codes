import { useState, useEffect, useRef, useCallback } from "react"

interface UseFetchOptions {
	enabled?: boolean
	refetchOnWindowFocus?: boolean
	cacheTime?: number
	pollInterval?: number
	onSuccess?: (data: any) => void
	onError?: (error: Error) => void
}

interface UseFetchState<T> {
	data: T | null
	loading: boolean
	error: string | null
	refetch: () => Promise<void>
	isRefetching: boolean
}

const cache = new Map<string, { data: any; timestamp: number }>()

export function useFetch<T = any>(
	url: string | null,
	options: UseFetchOptions = {},
): UseFetchState<T> {
	const {
		enabled = true,
		refetchOnWindowFocus = true,
		cacheTime = 5 * 60 * 1000, // 5 minutes
		pollInterval,
		onSuccess,
		onError,
	} = options

	const [data, setData] = useState<T | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [isRefetching, setIsRefetching] = useState(false)

	const abortControllerRef = useRef<AbortController | null>(null)
	const pollIntervalRef = useRef<NodeJS.Timeout | null>(null)
	const isInitialLoad = useRef(true)

	const fetchData = useCallback(
		async (isRefetch = false) => {
			if (!url || !enabled) return

			// Cancel previous request only if it's still the current request
			if (
				abortControllerRef.current &&
				!abortControllerRef.current.signal.aborted
			) {
				abortControllerRef.current.abort()
			}

			// Check cache first (only if not forcing a refetch)
			const cached = cache.get(url)
			if (cached && Date.now() - cached.timestamp < cacheTime && !isRefetch) {
				setData(cached.data)
				setLoading(false)
				setError(null)
				return
			}

			const abortController = new AbortController()
			abortControllerRef.current = abortController

			try {
				if (isRefetch) {
					setIsRefetching(true)
				} else {
					setLoading(true)
				}
				setError(null)

				const response = await fetch(url, {
					signal: abortController.signal,
				})

				// Check if this request was aborted
				if (abortController.signal.aborted) {
					return
				}

				if (!response.ok) {
					throw new Error(`HTTP ${response.status}: ${response.statusText}`)
				}

				const result = await response.json()

				// Only update state if this is still the current request
				if (
					!abortController.signal.aborted &&
					abortControllerRef.current === abortController
				) {
					// Cache the result
					cache.set(url, { data: result, timestamp: Date.now() })
					setData(result)
					setError(null)
				}
			} catch (err) {
				if (err instanceof Error && err.name === "AbortError") {
					return
				}

				// Only set error if this is still the current request
				if (!abortControllerRef.current?.signal.aborted) {
					const errorMessage =
						err instanceof Error ? err.message : "An unknown error occurred"
					setError(errorMessage)
				}
			} finally {
				// Only update loading states if this is still the current request
				if (
					!abortController.signal.aborted &&
					abortControllerRef.current === abortController
				) {
					setLoading(false)
					setIsRefetching(false)
					isInitialLoad.current = false
				}
			}
		},
		[url, enabled, cacheTime],
	)

	const refetch = useCallback(async () => {
		await fetchData(true)
	}, [fetchData])

	// Initial fetch
	useEffect(() => {
		if (url && enabled) {
			fetchData()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url, enabled]) // Only depend on url and enabled, not fetchData

	// Polling
	useEffect(() => {
		if (pollInterval && url && enabled && data) {
			pollIntervalRef.current = setInterval(() => {
				fetchData(true)
			}, pollInterval)

			return () => {
				if (pollIntervalRef.current) {
					clearInterval(pollIntervalRef.current)
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pollInterval, url, enabled, data]) // Don't include fetchData

	// Refetch on window focus
	useEffect(() => {
		if (!refetchOnWindowFocus || !url || !enabled) return

		const handleWindowFocus = () => {
			if (!isInitialLoad.current && document.visibilityState === "visible") {
				fetchData(true)
			}
		}

		const handleFocus = () => {
			if (!isInitialLoad.current) {
				fetchData(true)
			}
		}

		document.addEventListener("visibilitychange", handleWindowFocus)
		window.addEventListener("focus", handleFocus)

		return () => {
			document.removeEventListener("visibilitychange", handleWindowFocus)
			window.removeEventListener("focus", handleFocus)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [refetchOnWindowFocus, url, enabled]) // Don't include fetchData

	// Cleanup
	useEffect(() => {
		return () => {
			if (abortControllerRef.current) {
				abortControllerRef.current.abort()
			}
			if (pollIntervalRef.current) {
				clearInterval(pollIntervalRef.current)
			}
		}
	}, [])

	return {
		data,
		loading,
		error,
		refetch,
		isRefetching,
	}
}
