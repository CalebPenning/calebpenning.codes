import { useState, useEffect } from "react"

interface WeatherData {
	location: string
	temperature: number
	condition: string
	emoji: string
	humidity: number
	windSpeed: number
}

const WeatherWidget = () => {
	const [weather, setWeather] = useState<WeatherData | null>(null)
	const [loading, setLoading] = useState(true)

	// Mock weather data - TODO: replace with API
	useEffect(() => {
		const mockWeatherData: WeatherData[] = [
			{
				location: "San Francisco, CA",
				temperature: 72,
				condition: "Partly Cloudy",
				emoji: "⛅",
				humidity: 65,
				windSpeed: 8,
			},
			{
				location: "New York, NY",
				temperature: 68,
				condition: "Sunny",
				emoji: "☀️",
				humidity: 55,
				windSpeed: 12,
			},
			{
				location: "Seattle, WA",
				temperature: 63,
				condition: "Rainy",
				emoji: "🌧️",
				humidity: 80,
				windSpeed: 6,
			},
		]

		const timer = setTimeout(() => {
			const randomWeather =
				mockWeatherData[Math.floor(Math.random() * mockWeatherData.length)]
			setWeather(randomWeather)
			setLoading(false)
		}, 1500)

		return () => clearTimeout(timer)
	}, [])

	if (loading) {
		return (
			<div className="glass-card shadow-3d-medium flex min-h-[200px] items-center justify-center">
				<div className="text-center">
					<div className="mb-2 animate-pulse text-4xl">🌤️</div>
					<p className="text-white/80">Loading weather...</p>
				</div>
			</div>
		)
	}

	if (!weather) return null

	return (
		<div className="glass-card shadow-3d-medium hover:shadow-3d-heavy group transition-all duration-500 hover:scale-105">
			<div className="text-center">
				<div className="mb-3 text-5xl transition-transform duration-300 group-hover:scale-110">
					{weather.emoji}
				</div>
				<h3 className="group-hover:gradient-text-alt mb-1 text-lg font-semibold text-white transition-all duration-300">
					{weather.location}
				</h3>
				<div className="mb-2 text-3xl font-bold text-white">
					{weather.temperature}°F
				</div>
				<p className="mb-4 text-white/80 transition-colors duration-300 group-hover:text-white">
					{weather.condition}
				</p>

				{/* Weather Details */}
				<div className="grid grid-cols-2 gap-4 text-sm">
					<div className="text-center">
						<div className="mb-1 text-white/60">Humidity</div>
						<div className="font-medium text-white">{weather.humidity}%</div>
					</div>
					<div className="text-center">
						<div className="mb-1 text-white/60">Wind</div>
						<div className="font-medium text-white">
							{weather.windSpeed} mph
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default WeatherWidget
