import { useState } from "react"
import emailjs from "@emailjs/browser"

const Contact = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitStatus, setSubmitStatus] = useState<
		"idle" | "success" | "error"
	>("idle")

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (
			!formData.name.trim() ||
			!formData.email.trim() ||
			!formData.message.trim()
		) {
			setSubmitStatus("error")
			return
		}

		setIsSubmitting(true)
		setSubmitStatus("idle")

		try {
			const result = await emailjs.send(
				import.meta.env.VITE_EMAILJS_SERVICE_ID || "your_service_id",
				import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "your_template_id",
				{
					from_name: formData.name,
					from_email: formData.email,
					title: formData.subject,
					message: formData.message,
					email: formData.email,
					name: formData.name,
					time: new Date().toLocaleString("en-US", {
						timeZone: "America/Los_Angeles",
					}),
					to_email: "caleb.penning@gmail.com",
				},
				import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
			)

			setSubmitStatus("success")

			setFormData({
				name: "",
				email: "",
				subject: "",
				message: "",
			})
		} catch (error) {
			console.error("Email send failed:", error)
			setSubmitStatus("error")
		} finally {
			setIsSubmitting(false)
			setTimeout(() => {
				setSubmitStatus("idle")
			}, 3000)
		}
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
							<form
								onSubmit={(e) => {
									e.preventDefault()
									handleSubmit(e)
								}}
								className="space-y-6"
							>
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
									disabled={isSubmitting}
									className={`glass-button shadow-3d-medium hover:shadow-3d-heavy w-full py-4 text-lg font-semibold text-white transition-all duration-300 ${
										isSubmitting
											? "cursor-not-allowed opacity-75"
											: "hover:scale-105"
									} ${
										submitStatus === "success"
											? "bg-green-500/20"
											: submitStatus === "error"
												? "bg-red-500/20"
												: ""
									}`}
								>
									{isSubmitting ? (
										<span className="flex items-center justify-center gap-2">
											<div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
											Sending...
										</span>
									) : submitStatus === "success" ? (
										<span className="flex items-center justify-center gap-2">
											✅ Message Sent!
										</span>
									) : submitStatus === "error" ? (
										<span className="flex items-center justify-center gap-2">
											❌ Try Again
										</span>
									) : (
										"Send Message 🚀"
									)}
								</button>
							</form>

							{submitStatus === "success" && (
								<div className="glass-card fade-in-up mt-4 border-green-400/30 bg-green-500/10 p-4 text-center">
									<p className="font-medium text-green-200">
										🎉 Thanks for reaching out! I'll get back to you soon.
									</p>
								</div>
							)}

							{submitStatus === "error" && (
								<div className="glass-card fade-in-up mt-4 border-red-400/30 bg-red-500/10 p-4 text-center">
									<p className="font-medium text-red-200">
										😅 Oops! Something went wrong. Please try again or email me
										directly.
									</p>
								</div>
							)}
						</div>

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
