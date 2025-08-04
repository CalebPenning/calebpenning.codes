import WeatherWidget from "../WeatherWidget"

const Home = () => {
	return (
		<div className="min-h-screen px-4 pt-20">
			{/* Hero Section */}
			<section className="container mx-auto py-20">
				<div className="mb-16 text-center">
					<h1 className="float-animation mb-6 text-6xl font-bold text-white md:text-8xl">
						Hello, I'm <span className="gradient-text-alt">Caleb</span>
					</h1>
					<p className="mx-auto mb-8 max-w-2xl text-xl text-white/90 md:text-2xl">
						Full-Stack Developer crafting beautiful, functional web experiences
					</p>
					<div className="flex justify-center gap-4">
						<button className="glass-button shadow-3d-medium hover:shadow-3d-heavy font-semibold text-white">
							View My Work
						</button>
						<button className="glass-button shadow-3d-medium hover:shadow-3d-heavy font-semibold text-white">
							Get In Touch
						</button>
					</div>
				</div>

				{/* Floating Elements - Hidden on mobile, positioned to avoid text */}
				<div className="relative hidden md:block">
					<div
						className="glass float-animation shadow-3d-light absolute left-4 top-[-50px] h-12 w-12 rounded-full lg:left-10 lg:h-16 lg:w-16"
						style={{ animationDelay: "0s" }}
					></div>
					<div
						className="glass float-animation shadow-3d-light absolute right-4 top-[-30px] h-10 w-10 rounded-full lg:right-16 lg:h-12 lg:w-12"
						style={{ animationDelay: "2s" }}
					></div>
					<div
						className="glass float-animation shadow-3d-light absolute bottom-[-40px] left-1/4 h-8 w-8 rounded-full lg:h-10 lg:w-10"
						style={{ animationDelay: "4s" }}
					></div>
					<div
						className="glass float-animation shadow-3d-light lg:h-18 lg:w-18 absolute bottom-[-60px] right-1/3 h-14 w-14 rounded-full"
						style={{ animationDelay: "1s" }}
					></div>
				</div>
			</section>

			{/* Quick About Section */}
			<section className="container mx-auto py-16">
				<div className="grid gap-8 md:grid-cols-3">
					<div
						className="glass-card shadow-3d-medium hover:shadow-3d-heavy fade-in-up group text-center transition-all duration-500 hover:-translate-y-2 hover:scale-105"
						style={{ animationDelay: "0.1s" }}
					>
						<div className="mb-4 text-4xl transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125">
							🚀
						</div>
						<h3 className="group-hover:gradient-text-alt mb-2 text-xl font-semibold text-white transition-all duration-300">
							Frontend
						</h3>
						<p className="text-white/80 transition-colors duration-300 group-hover:text-white">
							React, TypeScript, Tailwind CSS
						</p>
					</div>
					<div
						className="glass-card shadow-3d-medium hover:shadow-3d-heavy fade-in-up group text-center transition-all duration-500 hover:-translate-y-2 hover:scale-105"
						style={{ animationDelay: "0.2s" }}
					>
						<div className="mb-4 text-4xl transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125">
							⚡
						</div>
						<h3 className="group-hover:gradient-text-alt mb-2 text-xl font-semibold text-white transition-all duration-300">
							Backend
						</h3>
						<p className="text-white/80 transition-colors duration-300 group-hover:text-white">
							Node.js, Python, Databases
						</p>
					</div>
					<div
						className="glass-card shadow-3d-medium hover:shadow-3d-heavy fade-in-up group text-center transition-all duration-500 hover:-translate-y-2 hover:scale-105"
						style={{ animationDelay: "0.3s" }}
					>
						<div className="mb-4 text-4xl transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125">
							✨
						</div>
						<h3 className="group-hover:gradient-text-alt mb-2 text-xl font-semibold text-white transition-all duration-300">
							Design
						</h3>
						<p className="text-white/80 transition-colors duration-300 group-hover:text-white">
							UI/UX, Responsive Design
						</p>
					</div>
				</div>
			</section>

			{/* Mini Projects Showcase */}
			<section className="container mx-auto py-16">
				<div className="mb-12 text-center">
					<h2 className="mb-4 text-4xl font-bold text-white">
						Interactive <span className="gradient-text-alt">Demos</span>
					</h2>
					<p className="mx-auto max-w-2xl text-white/80">
						Check out these live components I built to showcase real
						functionality
					</p>
				</div>
				<div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2 lg:grid-cols-3">
					<WeatherWidget />
					<div className="glass-card shadow-3d-medium hover:shadow-3d-heavy group transition-all duration-500 hover:scale-105">
						<div className="text-center">
							<div className="mb-3 text-4xl transition-transform duration-300 group-hover:scale-110">
								💬
							</div>
							<h3 className="group-hover:gradient-text-alt mb-2 text-lg font-semibold text-white transition-all duration-300">
								Live Chat
							</h3>
							<p className="mb-4 text-sm text-white/80 transition-colors duration-300 group-hover:text-white">
								Real-time messaging component
							</p>
							<button className="glass-button px-4 py-2 text-sm text-white">
								Coming Soon
							</button>
						</div>
					</div>
					<div className="glass-card shadow-3d-medium hover:shadow-3d-heavy group transition-all duration-500 hover:scale-105">
						<div className="text-center">
							<div className="mb-3 text-4xl transition-transform duration-300 group-hover:scale-110">
								🎨
							</div>
							<h3 className="group-hover:gradient-text-alt mb-2 text-lg font-semibold text-white transition-all duration-300">
								Color Generator
							</h3>
							<p className="mb-4 text-sm text-white/80 transition-colors duration-300 group-hover:text-white">
								Frutiger Aero palette tool
							</p>
							<button className="glass-button px-4 py-2 text-sm text-white">
								Coming Soon
							</button>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Home
