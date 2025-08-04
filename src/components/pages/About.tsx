const About = () => {
	return (
		<div className="min-h-screen px-4 pt-20">
			<section className="container mx-auto py-20">
				<div className="mx-auto max-w-4xl">
					<h1 className="mb-12 text-center text-5xl font-bold text-white md:text-6xl">
						About <span className="gradient-text-alt">Me</span>
					</h1>

					<div className="grid items-center gap-12 md:grid-cols-2">
						{/* Bio Section */}
						<div className="glass-card shadow-3d-medium">
							<h2 className="mb-4 text-2xl font-semibold text-white">
								My Story
							</h2>
							<p className="mb-4 leading-relaxed text-white/90">
								I'm a passionate full-stack developer who loves creating
								beautiful, functional web applications. With a keen eye for
								design and a solid foundation in modern web technologies, I
								bring ideas to life through code.
							</p>
							<p className="leading-relaxed text-white/90">
								When I'm not coding, you can find me exploring new technologies,
								contributing to open source projects, or enjoying the great
								outdoors.
							</p>
						</div>

						{/* Profile Image Placeholder */}
						<div className="glass-card shadow-3d-medium flex h-80 items-center justify-center">
							<div className="text-6xl">👨‍💻</div>
						</div>
					</div>

					{/* Skills Section */}
					<div className="mt-16">
						<h2 className="mb-8 text-center text-3xl font-bold text-white">
							Skills & Technologies
						</h2>
						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
							{[
								{
									category: "Frontend",
									skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
								},
								{
									category: "Backend",
									skills: ["Node.js", "Python", "Express", "FastAPI"],
								},
								{
									category: "Database",
									skills: ["PostgreSQL", "MongoDB", "Redis", "Prisma"],
								},
								{
									category: "Tools",
									skills: ["Git", "Docker", "AWS", "Vercel"],
								},
								{
									category: "Testing",
									skills: ["Jest", "Vitest", "Cypress", "Testing Library"],
								},
								{
									category: "Design",
									skills: ["Figma", "Adobe Creative Suite", "UI/UX"],
								},
							].map((skillGroup, index) => (
								<div
									key={skillGroup.category}
									className="glass-card shadow-3d-light hover:shadow-3d-medium transition-all duration-300"
									style={{ animationDelay: `${index * 0.1}s` }}
								>
									<h3 className="mb-3 text-xl font-semibold text-white">
										{skillGroup.category}
									</h3>
									<ul className="space-y-1">
										{skillGroup.skills.map((skill) => (
											<li
												key={skill}
												className="flex items-center text-white/80"
											>
												<span className="mr-2 h-2 w-2 rounded-full bg-white/60"></span>
												{skill}
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default About
