import styles from "./why.module.css";
import { NavLink } from "@remix-run/react";
export default function Why() {
	return (
		<section className={`${styles["why-section"]} gutter-p section-p`}>
			<h2>Why Us?</h2>
			<div className={styles["why-card"]}>
				<p>
					We understand the importance of preserving memories. Our bears are
					handcrafted with care, ensuring each stitch is made with love. We take
					pride in creating something truly special for you to hold close.
				</p>
				<p className={styles["why-cta-text"]}>
					Every Order Made With <span>Love.</span>
				</p>
				<NavLink className="primary_button" to={"/store"}>
					Shop Today
				</NavLink>
			</div>
		</section>
	);
}
