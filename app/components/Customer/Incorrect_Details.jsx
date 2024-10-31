import { NavLink } from "@remix-run/react";
import styles from "./incorrect_details.module.css";

export default function Incorrect_Details() {
	return (
		<div className={styles["alert"]}>
			<div className={styles["incorrect_details"]}>
				<img src="/icons/x_mark_icon.svg" alt="incorrect" />
				<p>Incorrect Login Details.</p>
			</div>
			<p>
				Need to reset your password?{" "}
				<NavLink to={"/store/customer/reset_password"}>Reset here.</NavLink>
			</p>
		</div>
	);
}
