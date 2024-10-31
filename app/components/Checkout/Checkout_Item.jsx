import fortmatCurrency from "../../utils/format_currency";
import styles from "./checkout_item.module.css";
export default function Checkout_Item({ product }) {
	console.log(product);
	return (
		<div className={styles["checkout_item"]}>
			<div>
				<p className={styles["item_title"]}>{product.title}</p>
				<p>{product.variant.title}</p>
				<p>{product.metadata?.custom_text}</p>
			</div>
			<div>
				<p className={styles["qty"]}>x {product.quantity}</p>
				<p className={styles["price"]}>{fortmatCurrency(product.total)}</p>
			</div>
		</div>
	);
}
