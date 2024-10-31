import styles from "./how_it_works.module.css";
import { NavLink } from "@remix-run/react";
import HowCard from "./How_Card";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
export default function How_It_Works() {
	const [emblaRef] = useEmblaCarousel({ loop: false }, [
		Autoplay({ delay: 3500 }),
	]);
	return (
		<section className={`${styles["how_section"]} gutter-p section-p`}>
			<h2>How It Works</h2>
			<div className={styles["embla"]} ref={emblaRef}>
				<div className={styles["embla__container"]}>
					<div className={styles["embla__slide"]}>
						<HowCard
							text="Choose up to three garments that hold the most significance to you."
							step="1"
						/>
					</div>
					<div className={styles["embla__slide"]}>
						<HowCard
							text="Choose from our variety of memory keepsake items and additional features such as embroidered names, dates, or messages."
							step="2"
						/>
					</div>
					<div className={styles["embla__slide"]}>
						<HowCard
							text="After selecting your clothing and customizations, place your order, and ship the clothing to us. We’ll handle the rest with care and attention to detail."
							step="3"
						/>
					</div>
				</div>
			</div>

			<div className={styles["how-cta"]}>
				<p>Ready to create your own comforting memory keepsake?</p>
				<NavLink to={"/store"} className="primary_button">
					Browse Keepsakes
				</NavLink>
			</div>
		</section>
	);
}
