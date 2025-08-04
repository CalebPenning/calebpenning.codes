import { Link, useLocation } from "react-router-dom"
import clsx from "clsx"

const Header = () => {
	const location = useLocation()
	const activeLiStyles = (path: string) => {
		const pathMatchesLink = location.pathname === path
		return clsx("transition-all duration-300", {
			"scale-105 font-semibold text-white": pathMatchesLink,
			"text-white/80 hover:scale-105 hover:text-white": !pathMatchesLink,
		})
	}
	return (
		<header className="glass-card fixed left-0 right-0 top-0 z-50 m-4 rounded-2xl">
			<nav className="flex w-full flex-col items-center justify-between p-2 md:flex-row">
				<div className="text-xl font-bold text-white">
					<span className="gradient-text-alt">Caleb Penning</span>
				</div>
				<ul className="flex items-center gap-8">
					<li>
						<Link to="/" className={activeLiStyles("/")}>
							Home
						</Link>
					</li>
					<li>
						<Link to="/about" className={activeLiStyles("/about")}>
							About
						</Link>
					</li>
					<li>
						<Link to="/projects" className={activeLiStyles("/projects")}>
							Projects
						</Link>
					</li>
					<li>
						<Link to="/contact" className={activeLiStyles("/contact")}>
							Contact
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default Header
