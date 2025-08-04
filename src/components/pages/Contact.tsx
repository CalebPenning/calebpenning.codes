import { useState } from "react"

const Contact = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	})

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		console.log("Form submitted:", formData)
		// TODO: impl
	}

	return (
		<div className="min-h-screen px-4 pt-20">
			<section className="container mx-auto py-20">
				<div className="mx-auto max-w-4xl">
					<h1 className="mb-12 text-center text-5xl font-bold text-white md:text-6xl">
						Get In <span className="gradient-text-alt">Touch</span>
					</h1>

					<div className="grid gap-12 md:grid-cols-2">
						{/* Contact Form */}
						<div className="glass-card shadow-3d-medium">
							<h2 className="mb-6 text-2xl font-semibold text-white">
								Send me a message
							</h2>
							<form onSubmit={handleSubmit} className="space-y-6">
								<div>
									<label
										htmlFor="name"
										className="mb-2 block font-medium text-white/90"
									>
										Name
									</label>
									<input
										type="text"
										id="name"
										name="name"
										value={formData.name}
										onChange={handleChange}
										className="glass w-full rounded-lg border border-white/20 px-4 py-3 text-white placeholder-white/60 transition-all duration-300 focus:border-white/40 focus:outline-none"
										placeholder="Your Name"
										required
									/>
								</div>

								<div>
									<label
										htmlFor="email"
										className="mb-2 block font-medium text-white/90"
									>
										Email
									</label>
									<input
										type="email"
										id="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										className="glass w-full rounded-lg border border-white/20 px-4 py-3 text-white placeholder-white/60 transition-all duration-300 focus:border-white/40 focus:outline-none"
										placeholder="your.email@example.com"
										required
									/>
								</div>

								<div>
									<label
										htmlFor="subject"
										className="mb-2 block font-medium text-white/90"
									>
										Subject
									</label>
									<input
										type="text"
										id="subject"
										name="subject"
										value={formData.subject}
										onChange={handleChange}
										className="glass w-full rounded-lg border border-white/20 px-4 py-3 text-white placeholder-white/60 transition-all duration-300 focus:border-white/40 focus:outline-none"
										placeholder="What's this about?"
										required
									/>
								</div>

								<div>
									<label
										htmlFor="message"
										className="mb-2 block font-medium text-white/90"
									>
										Message
									</label>
									<textarea
										id="message"
										name="message"
										value={formData.message}
										onChange={handleChange}
										rows={5}
										className="glass w-full resize-none rounded-lg border border-white/20 px-4 py-3 text-white placeholder-white/60 transition-all duration-300 focus:border-white/40 focus:outline-none"
										placeholder="Tell me about your project or just say hello!"
										required
									/>
								</div>

								<button
									type="submit"
									className="glass-button shadow-3d-medium hover:shadow-3d-heavy w-full py-4 text-lg font-semibold text-white"
								>
									Send Message 🚀
								</button>
							</form>
						</div>

						{/* Contact Info */}
						<div className="space-y-6">
							<div className="glass-card shadow-3d-medium">
								<h3 className="mb-4 text-xl font-semibold text-white">
									Let's connect!
								</h3>
								<p className="mb-6 leading-relaxed text-white/80">
									I'm always interested in hearing about new opportunities,
									collaborative projects, or just having a chat about technology
									and development.
								</p>

								<div className="space-y-4">
									<a
										href="mailto:caleb.penning@gmail.com"
										className="group flex items-center space-x-3 rounded-lg p-3 transition-all duration-300 hover:bg-white/10"
									>
										<div className="glass flex h-10 w-10 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110">
											<span>📧</span>
										</div>
										<div>
											<p className="group-hover:gradient-text-alt font-medium text-white transition-all duration-300">
												Email
											</p>
											<p className="text-white/80 transition-colors duration-300 group-hover:text-white">
												caleb.penning@example.com
											</p>
										</div>
									</a>

									<a
										href="https://linkedin.com/in/calebpenning"
										target="_blank"
										rel="noopener noreferrer"
										className="group flex items-center space-x-3 rounded-lg p-3 transition-all duration-300 hover:bg-white/10"
									>
										<div className="glass flex h-10 w-10 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110">
											<span>💼</span>
										</div>
										<div>
											<p className="group-hover:gradient-text-alt font-medium text-white transition-all duration-300">
												LinkedIn
											</p>
											<p className="text-white/80 transition-colors duration-300 group-hover:text-white">
												linkedin.com/in/calebpenning
											</p>
										</div>
									</a>

									<a
										href="https://github.com/calebpenning"
										target="_blank"
										rel="noopener noreferrer"
										className="group flex items-center space-x-3 rounded-lg p-3 transition-all duration-300 hover:bg-white/10"
									>
										<div className="glass flex h-10 w-10 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110">
											<span>🐙</span>
										</div>
										<div>
											<p className="group-hover:gradient-text-alt font-medium text-white transition-all duration-300">
												GitHub
											</p>
											<p className="text-white/80 transition-colors duration-300 group-hover:text-white">
												github.com/calebpenning
											</p>
										</div>
									</a>
								</div>
							</div>

							{/* Social Links */}
							<div className="glass-card shadow-3d-medium">
								<h3 className="mb-4 text-xl font-semibold text-white">
									Follow me
								</h3>
								<div className="flex space-x-4">
									<a
										href="https://linkedin.com/in/calebpenning"
										target="_blank"
										rel="noopener noreferrer"
										className="glass group flex h-12 w-12 items-center justify-center rounded-lg transition-all duration-300 hover:rotate-12 hover:scale-110 hover:bg-white/20"
									>
										<span className="text-xl transition-transform duration-300 group-hover:scale-125">
											💼
										</span>
									</a>
									<a
										href="https://github.com/calebpenning"
										target="_blank"
										rel="noopener noreferrer"
										className="glass group flex h-12 w-12 items-center justify-center rounded-lg transition-all duration-300 hover:rotate-12 hover:scale-110 hover:bg-white/20"
									>
										<span className="text-xl transition-transform duration-300 group-hover:scale-125">
											🐙
										</span>
									</a>
								</div>
							</div>

							{/* Availability */}
							<div className="glass-card shadow-3d-medium">
								<div className="mb-2 flex items-center space-x-3">
									<div className="h-3 w-3 animate-pulse rounded-full bg-green-400"></div>
									<span className="font-medium text-white">
										Available for work
									</span>
								</div>
								<p className="text-sm text-white/80">
									Currently accepting new projects and collaborations
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Contact
