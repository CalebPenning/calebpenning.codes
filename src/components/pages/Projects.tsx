const Projects = () => {
	const projects = [
		{
			title: "'Gaming Book Club' Discord Bot",
			description:
				"A Discord bot written in Typescript with discord.js that allows server members to run an automated 'Gaming book club'. Features include automated nominations for users to pick for a given month, interfacing with the Giant Bomb API to display rich information about games, and more.",
			technologies: [
				"Typescript",
				"Node.js",
				"PostgreSQL",
				"Giant Bomb API",
				"discord.js",
			],
			status: "Ongoing",
			link: "https://github.com/CalebPenning/game-calendar-bot",
			demo: "#",
		},
		{
			title: "Portfolio Website",
			description:
				"This very website! A modern portfolio showcasing Frutiger Aero design with glassmorphism effects, smooth animations, and interactive components.",
			technologies: ["React", "TypeScript", "Tailwind", "Vite"],
			status: "Ongoing",
			link: "https://github.com/calebpenning/calebpenning.codes",
			demo: "/",
		},
		{
			title: "Weather Widget Component",
			description:
				"An interactive weather component with loading states, mock API integration, and beautiful glassmorphic design. Demonstrates React hooks and state management.",
			technologies: ["React", "TypeScript", "CSS Animations"],
			status: "In Progress",
			link: "https://github.com/calebpenning/calebpenning.codes",
			demo: "/",
		},
		{
			title: "Real-time Chat Application",
			description:
				"A live messaging application with WebSocket integration, user authentication, and real-time updates. Currently in development.",
			technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
			status: "Planning",
			link: "#",
			demo: "#",
		},
	]

	return (
		<div className="min-h-screen px-4 pt-20">
			<section className="container mx-auto py-20">
				<div className="mx-auto max-w-6xl">
					<h1 className="mb-12 text-center text-5xl font-bold text-white md:text-6xl">
						My <span className="gradient-text-alt">Projects</span>
					</h1>

					<div className="grid gap-8 md:grid-cols-2">
						{projects.map((project, index) => (
							<div
								key={project.title}
								className="glass-card shadow-3d-medium hover:shadow-3d-heavy group transition-all duration-300"
								style={{ animationDelay: `${index * 0.1}s` }}
							>
								{/* Project Header */}
								<div className="mb-4 flex items-start justify-between">
									<h3 className="group-hover:gradient-text text-2xl font-semibold text-white transition-all duration-300">
										{project.title}
									</h3>
									<span
										className={`rounded-full px-3 py-1 text-sm font-medium ${
											project.status === "Completed"
												? "bg-green-500/20 text-green-200"
												: "bg-yellow-500/20 text-yellow-200"
										}`}
									>
										{project.status}
									</span>
								</div>

								{/* Project Description */}
								<p className="mb-6 leading-relaxed text-white/80">
									{project.description}
								</p>

								{/* Technologies */}
								<div className="mb-6">
									<h4 className="mb-2 font-medium text-white">Technologies:</h4>
									<div className="flex flex-wrap gap-2">
										{project.technologies.map((tech) => (
											<span
												key={tech}
												className="glass rounded-full border border-white/20 px-3 py-1 text-sm text-white/90"
											>
												{tech}
											</span>
										))}
									</div>
								</div>

								{/* Project Link */}
								<div className="flex items-center justify-between">
									<a
										href={project.link}
										target="_blank"
										rel="noopener noreferrer"
										className="glass-button font-medium text-white transition-transform duration-300 hover:scale-105"
									>
										View Code
									</a>
									<div className="flex gap-2">
										<a
											href={project.link}
											target="_blank"
											rel="noopener noreferrer"
											className="glass rounded-lg p-2 transition-all duration-300 hover:rotate-12 hover:scale-110 hover:bg-white/20"
										>
											<span className="text-white">🔗</span>
										</a>
										<a
											href={project.demo}
											target={project.demo.startsWith("/") ? "_self" : "_blank"}
											rel="noopener noreferrer"
											className="glass rounded-lg p-2 transition-all duration-300 hover:rotate-12 hover:scale-110 hover:bg-white/20"
										>
											<span className="text-white">📱</span>
										</a>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* CTA Section */}
					<div className="mt-16 text-center">
						<div className="glass-card shadow-3d-medium mx-auto max-w-2xl">
							<h2 className="mb-4 text-3xl font-bold text-white">
								Interested in working together?
							</h2>
							<p className="mb-6 text-white/80">
								I'm always excited to take on new challenges and create amazing
								web experiences.
							</p>
							<button className="glass-button shadow-3d-medium hover:shadow-3d-heavy px-8 py-4 text-lg font-semibold text-white">
								Let's Build Something Great
							</button>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Projects
