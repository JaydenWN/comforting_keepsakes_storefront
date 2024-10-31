import { NavLink } from "@remix-run/react";
import styles from "./footer.module.css";

export default function Footer() {
	const date = new Date().getFullYear();
	return (
		<footer>
			<div className={styles["footer-links"]}>
				<div className={`${styles["site-links"]} gutter-m section-p`}>
					<p>Site Links</p>
					<ul>
						<li>
							<NavLink to={"/about"}>About</NavLink>
						</li>
						<li>
							<NavLink to={"/store/cart"}>Cart</NavLink>
						</li>
						<li>
							<NavLink to={"/contact"}>Contact</NavLink>
						</li>
						<li>
							<NavLink to={"/store"}>Products</NavLink>
						</li>
						<li>
							<NavLink to={"/store/customer"}>Account</NavLink>
						</li>
						<li>
							<NavLink to={"/store/customer/orders"}>Orders</NavLink>
						</li>
						<li>
							<NavLink to={"/faq"}>FAQ</NavLink>
						</li>
						<li>
							<NavLink to={"/privacy-policy"}>Privacy Policy</NavLink>
						</li>
					</ul>
				</div>
				<div className={`${styles["site-links"]} gutter-m section-p`}>
					<p>Social Links</p>
					<ul>
						<li>
							<NavLink to={"facebook.com"}>Facebook</NavLink>
						</li>
						<li>
							<NavLink to={"instagram.com"}>Instagram</NavLink>
						</li>
					</ul>
				</div>
			</div>
			<div className={styles["copy"]}>
				<small>© Comforting Keepsakes {date}</small>
				<small>Designed & Developed by Beachside Web Designs.</small>
			</div>
		</footer>
	);
}
