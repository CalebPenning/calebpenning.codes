import type { Theme } from "../../App"
import { Link, useLocation } from "react-router-dom"
import clsx from "clsx"

type HeaderProps = {
	theme: Theme
	setTheme: (theme: Theme) => void
}

const Header = ({ theme, setTheme }: HeaderProps) => {
	const location = useLocation()
	const activeLiStyles = (path: string) => {
		const pathMatchesLink = location.pathname === path
		return clsx({
			"text-sky-700": pathMatchesLink,
			"dark:text-slate-200": pathMatchesLink,
		})
	}
	return (
		<header className="flex h-12 w-full items-center pb-1 dark:bg-black">
			<nav className="flex w-full justify-between px-4">
				<ul className="flex items-center gap-4 text-sky-400 dark:text-white">
					<li>
						<Link to="/" className={activeLiStyles("/")}>
							Home
						</Link>
					</li>
					<li>
						<Link to="/links" className={activeLiStyles("/links")}>
							Links
						</Link>
					</li>
					<li>
						<Link to="/contact" className={activeLiStyles("/contact")}>
							Contact
						</Link>
					</li>
				</ul>
				<ul>
					<li>
						<button
							className="text-sky-400 dark:text-white"
							onClick={() => {
								theme === "dark" ? setTheme("light") : setTheme("dark")
							}}
						>
							Toggle Dark Mode
						</button>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default Header
