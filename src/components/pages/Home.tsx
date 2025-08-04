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
					<div className="glass-card shadow-3d-medium hover:shadow-3d-heavy text-center transition-all duration-300">
						<div className="mb-4 text-4xl">🚀</div>
						<h3 className="mb-2 text-xl font-semibold text-white">Frontend</h3>
						<p className="text-white/80">React, TypeScript, Tailwind CSS</p>
					</div>
					<div className="glass-card shadow-3d-medium hover:shadow-3d-heavy text-center transition-all duration-300">
						<div className="mb-4 text-4xl">⚡</div>
						<h3 className="mb-2 text-xl font-semibold text-white">Backend</h3>
						<p className="text-white/80">Node.js, Python, Databases</p>
					</div>
					<div className="glass-card shadow-3d-medium hover:shadow-3d-heavy text-center transition-all duration-300">
						<div className="mb-4 text-4xl">✨</div>
						<h3 className="mb-2 text-xl font-semibold text-white">Design</h3>
						<p className="text-white/80">UI/UX, Responsive Design</p>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Home
