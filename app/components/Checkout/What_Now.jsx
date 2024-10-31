import { NavLink } from "@remix-run/react";
import styles from "./what_now.module.css";
export default function What_Now() {
	return (
		<div className={`${styles["what_now"]} section-p`}>
			<h2>What Now?</h2>
			<p>We will shortly email you a confirmation email. </p>
			<p>
				If you placed an order that requires an article of clothing from your
				loved one, please ship it to [address]. Once we receive your items, we
				will begin work on you comforting keepsake.
			</p>
			<p>
				Thank you for shopping with Comforting Keepsakes. We will ensure the
				production of your keepsake is made with love.
			</p>
			<NavLink to={"/"} className={"primary_button"}>
				Return Home
			</NavLink>
		</div>
	);
}
