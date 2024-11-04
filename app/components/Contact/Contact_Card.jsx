import styles from "./contact_card.module.css";

export default function Contact_Card({ contactInfo, img, imgAlt }) {
	return (
		<div className={styles["contact_card"]}>
			<div className={styles["contact_img"]}>
				<img src={img} alt={imgAlt} />
			</div>
			<p>{contactInfo}</p>
		</div>
	);
}
