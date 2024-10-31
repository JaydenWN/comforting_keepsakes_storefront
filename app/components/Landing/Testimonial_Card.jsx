import styles from "./testimonial_card.module.css";
export default function Testimonial_Card({ quote, quotee, img, imgAlt }) {
	return (
		<div className={styles["testimonial_card"]}>
			<div className={styles["testimonial_image"]}>
				<img src={img} alt={imgAlt} />
			</div>
			<div className={styles["quote"]}>
				<blockquote>{quote}</blockquote>
				<p>- {quotee}</p>
			</div>
		</div>
	);
}
