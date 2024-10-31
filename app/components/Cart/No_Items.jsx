import styles from "./no_items.module.css";
import { NavLink } from "@remix-run/react";
export default function No_Items() {
	return (
		<div className={styles["no_items"]}>
			<p>There are no items in your cart.</p>

			<NavLink
				to={"/store"}
				className={`${styles["shop_button"]} primary_button`}
			>
				Shop Now
			</NavLink>
		</div>
	);
}
