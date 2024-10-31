import styles from "./how_card.module.css";
export default function How_Card({ step, text }) {
	return (
		<div className={`${styles["how_card"]}`}>
			<div className={styles["how_circle"]}>
				<p>{step}</p>
			</div>
			<p>{text}</p>
		</div>
	);
}
