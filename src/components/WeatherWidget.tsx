import { useState, useMemo } from "react"
import { useFetch } from "../hooks/useFetch"

interface WeatherApiResponse {
	result: {
		location: {
			name: string
			region: string
			country: string
		}
		current: {
			temp_f: number
			condition: {
				text: string
				icon: string
			}
			humidity: number
			wind_mph: number
			feelslike_f: number
			uv: number
		}
	}
}

interface WeatherData {
	location: string
	temperature: number
	condition: string
	emoji: string
	humidity: number
	windSpeed: number
	feelsLike: number
	uvIndex: number
}

const WeatherWidget = () => {
	const [currentLocation, setCurrentLocation] = useState("San Francisco")

	const getWeatherEmoji = (condition: string): string => {
		const conditionLower = condition.toLowerCase()
		if (conditionLower.includes("sunny") || conditionLower.includes("clear"))
			return "☀️"
		if (conditionLower.includes("partly cloudy")) return "⛅"
		if (
			conditionLower.includes("cloudy") ||
			conditionLower.includes("overcast")
		)
			return "☁️"
		if (conditionLower.includes("rain") || conditionLower.includes("drizzle"))
			return "🌧️"
		if (conditionLower.includes("storm") || conditionLower.includes("thunder"))
			return "⛈️"
		if (conditionLower.includes("snow")) return "❄️"
		if (conditionLower.includes("fog") || conditionLower.includes("mist"))
			return "🌫️"
		if (conditionLower.includes("wind")) return "💨"
		return "🌤️"
	}

	const url = useMemo(
		() =>
			`http://localhost:3000/api/weather/current?query=${encodeURIComponent(currentLocation)}`,
		[currentLocation],
	)

	const {
		data: rawWeatherData,
		loading,
		error,
		refetch,
		isRefetching,
	} = useFetch<WeatherApiResponse>(url, {
		refetchOnWindowFocus: true,
		cacheTime: 10 * 60 * 1000, // 10 minutes cache for weather
		onError: (error) => console.error("Weather fetch error:", error),
	})

	const weather = useMemo((): WeatherData | null => {
		if (!rawWeatherData) return null

		return {
			location: `${rawWeatherData.result.location.name}, ${rawWeatherData.result.location.region}`,
			temperature: Math.round(rawWeatherData.result.current.temp_f),
			condition: rawWeatherData.result.current.condition.text,
			emoji: getWeatherEmoji(rawWeatherData.result.current.condition.text),
			humidity: rawWeatherData.result.current.humidity,
			windSpeed: Math.round(rawWeatherData.result.current.wind_mph),
			feelsLike: Math.round(rawWeatherData.result.current.feelslike_f),
			uvIndex: rawWeatherData.result.current.uv,
		}
	}, [rawWeatherData])

	const handleLocationChange = (newLocation: string) => {
		if (newLocation.trim() && newLocation !== currentLocation) {
			setCurrentLocation(newLocation.trim())
		}
	}

	if (loading) {
		return (
			<div className="glass-card shadow-3d-medium relative overflow-hidden">
				<div className="shimmer absolute inset-0"></div>
				<div className="relative flex min-h-[280px] flex-col items-center justify-center">
					<div className="float-animation mb-4 animate-pulse text-6xl">🌈</div>
					<div className="pulse-glow mb-2 h-2 w-32 rounded-full bg-white/20"></div>
					<p className="gradient-text text-sm">Fetching weather magic...</p>
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className="glass-card shadow-3d-medium relative overflow-hidden">
				<div className="flex min-h-[280px] flex-col items-center justify-center text-center">
					<div className="mb-4 text-5xl">🌊</div>
					<p className="mb-4 text-white/80">{error}</p>
					<button
						onClick={refetch}
						className="glass-button px-4 py-2 text-sm text-white"
					>
						Try Again
					</button>
				</div>
			</div>
		)
	}

	if (!weather) return null

	return (
		<div className="glass-card shadow-3d-medium hover:shadow-3d-heavy group relative overflow-hidden transition-all duration-500 hover:scale-105">
			<div className="absolute -right-10 -top-10 h-20 w-20 rounded-full bg-gradient-to-br from-white/10 to-white/5 transition-all duration-700 group-hover:rotate-45 group-hover:scale-150"></div>
			<div className="absolute -bottom-8 -left-8 h-16 w-16 rounded-full bg-gradient-to-tr from-white/5 to-white/10 transition-all duration-700 group-hover:-rotate-12 group-hover:scale-125"></div>

			<div className="relative text-center">
				{/* Location Input */}
				<div className="mb-4">
					<input
						type="text"
						placeholder="Enter city..."
						className="glass w-full rounded-lg px-3 py-2 text-center text-sm text-white placeholder-white/60 transition-all duration-300 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								const target = e.target as HTMLInputElement
								handleLocationChange(target.value)
								target.blur()
							}
						}}
					/>
				</div>

				{/* Weather Icon with floating animation */}
				<div className="float-animation mb-4 text-7xl transition-transform duration-300 group-hover:scale-110">
					{weather.emoji}
				</div>

				{/* Location */}
				<h3 className="group-hover:gradient-text-alt mb-2 text-lg font-semibold text-white transition-all duration-300">
					{weather.location}
				</h3>

				{/* Temperature */}
				<div className="gradient-text mb-1 text-4xl font-bold transition-all duration-300">
					{weather.temperature}°F
				</div>

				{/* Feels like */}
				<p className="mb-3 text-sm text-white/70">
					Feels like {weather.feelsLike}°F
				</p>

				{/* Condition */}
				<p className="mb-6 text-white/80 transition-colors duration-300 group-hover:text-white">
					{weather.condition}
				</p>

				{/* Weather Details Grid */}
				<div className="grid grid-cols-2 gap-3 text-sm">
					<div className="glass rounded-lg p-3 text-center transition-all duration-300 hover:bg-white/20">
						<div className="mb-1 text-2xl">💧</div>
						<div className="mb-1 text-white/60">Humidity</div>
						<div className="font-semibold text-white">{weather.humidity}%</div>
					</div>
					<div className="glass rounded-lg p-3 text-center transition-all duration-300 hover:bg-white/20">
						<div className="mb-1 text-2xl">💨</div>
						<div className="mb-1 text-white/60">Wind</div>
						<div className="font-semibold text-white">
							{weather.windSpeed} mph
						</div>
					</div>
				</div>

				{/* Additional Details */}
				<div className="mt-4 grid grid-cols-1 gap-2 text-xs">
					<div className="flex justify-between text-white/60">
						<span>
							UV Index:{" "}
							<span className="font-medium text-white">{weather.uvIndex}</span>
						</span>
						<button
							onClick={refetch}
							disabled={isRefetching}
							className="glass rounded-full p-1 text-white transition-all duration-300 hover:rotate-180 hover:bg-white/20"
						>
							<span
								className={`inline-block transition-transform duration-500 ${isRefetching ? "animate-spin" : ""}`}
							>
								🔄
							</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default WeatherWidget
