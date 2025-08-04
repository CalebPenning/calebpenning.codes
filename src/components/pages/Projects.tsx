const Projects = () => {
	const projects = [
		{
			title: "E-Commerce Platform",
			description:
				"A full-stack e-commerce solution built with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.",
			technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
			status: "Completed",
			link: "#",
		},
		{
			title: "Task Management App",
			description:
				"A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
			technologies: ["Next.js", "TypeScript", "Prisma", "WebSocket"],
			status: "In Progress",
			link: "#",
		},
		{
			title: "Weather Dashboard",
			description:
				"A responsive weather dashboard with interactive maps, forecasts, and location-based weather alerts using multiple weather APIs.",
			technologies: ["React", "D3.js", "Weather API", "Tailwind"],
			status: "Completed",
			link: "#",
		},
		{
			title: "Portfolio Website",
			description:
				"This very website! A modern portfolio showcasing a Frutiger Aero-like design with glassmorphism effects and smooth animations.",
			technologies: ["React", "TypeScript", "Tailwind", "Vite"],
			status: "Completed",
			link: "#",
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
									<button className="glass-button font-medium text-white transition-transform duration-300 hover:scale-105">
										View Project
									</button>
									<div className="flex gap-2">
										<button className="glass rounded-lg p-2 transition-all duration-300 hover:bg-white/20">
											<span className="text-white">🔗</span>
										</button>
										<button className="glass rounded-lg p-2 transition-all duration-300 hover:bg-white/20">
											<span className="text-white">📱</span>
										</button>
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
