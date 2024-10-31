import fortmatCurrency from "../../utils/format_currency";
import Checkout_Item from "./Checkout_Item";
import styles from "./checkout_totals.module.css";
export default function Checkout_Totals({ cart, selectedShipping }) {
	console.log(cart);
	return (
		<div className={`${styles["items"]} section-p`}>
			{cart.items.map((product) => (
				<Checkout_Item key={product.id} product={product} />
			))}

			{selectedShipping && (
				<div className={styles["shipping_total"]}>
					<div className="">
						<p className={styles["shipping_title"]}>Shipping</p>
						<p className={styles["shipping_option"]}>{selectedShipping.name}</p>
					</div>
					<p className={styles["price"]}>
						{fortmatCurrency(selectedShipping.price_incl_tax)}
					</p>
				</div>
			)}
			{cart.shipping_total !== 0 && (
				<div className={styles["shipping_total"]}>
					<div>
						<p className={styles["shipping_title"]}>Shipping</p>
					</div>
					<p className={styles["price"]}>
						{fortmatCurrency(cart.shipping_total + cart.shipping_tax_total)}
					</p>
				</div>
			)}

			<div className={styles["total"]}>
				<p className={styles["shipping_title"]}>Total</p>
				<p className={styles["price"]}>
					{selectedShipping
						? fortmatCurrency(cart.total + selectedShipping?.price_incl_tax)
						: fortmatCurrency(cart.total)}
				</p>
			</div>
		</div>
	);
}
