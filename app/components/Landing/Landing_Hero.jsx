import styles from "./landing_hero.module.css";
import { NavLink } from "@remix-run/react";
export default function Landing_Hero() {
	return (
		<section className={`${styles["landing-hero"]} gutter-p section-p`}>
			<div className={styles["landing_img"]}>
				<img src="/images/keepsake_bear_landing_image.jpg" alt="hero" />
			</div>

			<div className={styles["landing_content"]}>
				<h1>
					<span>Handcrafted Keepsakes</span> That Cherish Every Memory.
				</h1>
				<NavLink className="primary_button" to={"/store"}>
					Shop Now
				</NavLink>
			</div>
			<div className={styles["hero_text"]}>
				<p>
					We create memory bears, beautifully handcrafted from your loved one’s
					clothing. These bears serve as a tangible reminder of cherished
					memories, offering comfort during times of loss and becoming a lasting
					keepsake for you and your family.
				</p>
			</div>
		</section>
	);
}
