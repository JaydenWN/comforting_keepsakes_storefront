import { Button } from "react-aria-components";
import styles from "./navbar.module.css";
import { useRef, useEffect, useState } from "react";
import { NavLink, useLocation } from "@remix-run/react";

export default function Navbar() {
	const mobileNavigationMenu = useRef();
	const location = useLocation();
	const [mobileOpen, setMobileOpen] = useState(false);

	useEffect(() => {
		if (mobileNavigationMenu.current.style.visibility === "visible") {
			setTimeout(() => {
				mobileNavigationMenu.current.style.visibility = "hidden";
			}, 200);
			mobileNavigationMenu.current.style.opacity = 0;
			setMobileOpen(!mobileOpen);
		}
	}, [location]);

	function handleMobileNavMenu() {
		setMobileOpen(!mobileOpen);
		const visibilityStatus = window.getComputedStyle(
			mobileNavigationMenu.current,
		).visibility;
		if (visibilityStatus === "hidden") {
			mobileNavigationMenu.current.style.visibility = "visible";
			mobileNavigationMenu.current.style.opacity = 1;
		} else {
			setTimeout(() => {
				mobileNavigationMenu.current.style.visibility = "hidden";
			}, 200);
			mobileNavigationMenu.current.style.opacity = 0;
		}
	}
	return (
		<>
			<nav className={styles["navbar"]}>
				<div className={`${styles.nav_container} gutter-p`}>
					<NavLink to={"/"}>
						<img src={"/icons/site_logo.svg"} alt="site_logo" />
					</NavLink>
					<div className={styles["navigation_container"]}>
						<ul className={styles["nav-links"]} ref={mobileNavigationMenu}>
							<li>
								<NavLink
									to={"/about"}
									className={({ isActive }) =>
										isActive ? styles["nav-active"] : ""
									}
								>
									About
								</NavLink>
							</li>
							<li className={styles["mobile_link"]}>
								<NavLink
									to={"/store/cart"}
									className={({ isActive }) =>
										isActive ? styles["nav-active"] : ""
									}
								>
									Cart
								</NavLink>
							</li>
							<li>
								<NavLink
									to={"/contact"}
									className={({ isActive }) =>
										isActive ? styles["nav-active"] : ""
									}
								>
									Contact
								</NavLink>
							</li>
							<li>
								<NavLink
									to={"/store"}
									className={({ isActive }) =>
										isActive ? styles["nav-active"] : ""
									}
								>
									Products
								</NavLink>
							</li>
							<li className={styles["mobile_link"]}>
								<NavLink
									to={"/store/customer"}
									className={({ isActive }) =>
										isActive ? styles["nav-active"] : ""
									}
								>
									Account
								</NavLink>
							</li>
							<li>
								<NavLink
									to={"/store/customer/orders"}
									className={({ isActive }) =>
										isActive ? styles["nav-active"] : ""
									}
								>
									Orders
								</NavLink>
							</li>
							<li>
								<NavLink
									to={"/faq"}
									className={({ isActive }) =>
										isActive ? styles["nav-active"] : ""
									}
								>
									FAQ
								</NavLink>
							</li>
						</ul>
						<div className={styles["nav-buttons"]}>
							<NavLink to={"/store/customer"} aria-label="customer profile">
								<img src="/icons/user_icon.svg" alt="customer profile" />
							</NavLink>
							<NavLink to={"/store/cart"} aria-label="customer cart">
								<img src="/icons/cart_icon.svg" alt="customer cart" />
							</NavLink>
							<Button
								onPress={handleMobileNavMenu}
								className={`${styles["mobile-nav-button"]} ${styles.mobile_link}`}
								aria-label="menu toggle"
							>
								{mobileOpen === true ? (
									<img src="/icons/close_icon.svg" alt="menu close" />
								) : (
									<img src="/icons/menu_icon.svg" alt="menu open" />
								)}
							</Button>
						</div>
					</div>
				</div>
			</nav>

			<div className={styles["navbar_padding"]}></div>
		</>
	);
}
