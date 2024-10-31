import styles from "./order_confirmation.module.css";

export default function Order_Confirmation() {
	return (
		<div className={styles["order_confirmation"]}>
			<img src="/icons/checkmark_icon.svg" alt="confirm check" />
			<p>Your order has been placed.</p>
		</div>
	);
}
