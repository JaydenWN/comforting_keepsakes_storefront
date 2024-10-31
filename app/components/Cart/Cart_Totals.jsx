import styles from "./cart_totals.module.css";
import fortmatCurrency from "../../utils/format_currency";
export default function Cart_Totals({ subTotal }) {
	return (
		<>
			<div className={styles["totals"]}>
				<p>Subtotal</p>
				<p>{fortmatCurrency(subTotal)}</p>
			</div>
			<div className={styles["totals_footer"]}>
				<p>Shipping Calculated at Checkout.</p>
			</div>
		</>
	);
}
