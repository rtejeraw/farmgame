import { NavLink } from "react-router";
import styles from "./header.module.css";

function header({ title }) {
	return (
		<header className={styles["header"]}>
			<h1>{title}</h1>

			<nav>
				<NavLink
					to="/"
					className={({ isActive }) => {
						return isActive
							? styles["navlink-active"]
							: styles["navlink"];
					}}
				>
					Home
				</NavLink>
				<NavLink
					to="/land"
					className={({ isActive }) => {
						return isActive
							? styles["navlink-active"]
							: styles["navlink"];
					}}
				>
					Land
				</NavLink>
				<NavLink
					to="/market"
					className={({ isActive }) => {
						return isActive
							? styles["navlink-active"]
							: styles["navlink"];
					}}
				>
					Market
				</NavLink>
				<NavLink
					to="/about"
					className={({ isActive }) => {
						return isActive
							? styles["navlink-active"]
							: styles["navlink"];
					}}
				>
					About
				</NavLink>
			</nav>
		</header>
	);
}

export default header;
