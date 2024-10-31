import { Button } from "react-aria-components";
import styles from "./cart_item.module.css";
import { useState, useCallback } from "react";
import debounce from "debounce";
import { useFetcher } from "@remix-run/react";
import formatCurrency from "../../utils/format_currency";

export default function Cart_Item({ product, handleRemove }) {
	const [qty, setQty] = useState(product.quantity);
	const fetcher = useFetcher();

	// Create a memoized debounced function that persists between renders
	const debounceSubmit = useCallback(
		debounce((data) => {
			fetcher.submit(data, { method: "PATCH" });
			console.log("Debounced submission with data:", data);
		}, 520),
		[],
	);

	// Handle Qty Changes
	function handleQty(method, line_id) {
		if (method === "deduct") {
			const newQty = qty - 1;
			if (newQty <= 0) {
				handleRemove(line_id);
			}
			setQty(newQty);
			const data = { line_id, newQty };
			debounceSubmit(data);
		}
		if (method === "add") {
			const newQty = qty + 1;
			setQty(newQty);
			const data = { line_id, newQty };
			debounceSubmit(data);
		}
	}

	return (
		<div className={styles["cart_item"]}>
			<div className={styles["item_header"]}>
				<div className={styles["product_thumbnail"]}>
					<img
						src={product.thumbnail}
						alt={`${product.title} ${product.variant.title}`}
					/>
				</div>
				<div className={styles["item_description"]}>
					<h2>{product.title}</h2>
					<p>{product.variant.title}</p>
					{product.metadata.custom_text ? (
						<p>"{product.metadata.custom_text}"</p>
					) : null}
				</div>
				<div className={styles["close"]}>
					<Button type="button" onPress={() => handleRemove(product.id)}>
						<img src="/icons/close_icon.svg" alt="delete" />
					</Button>
				</div>
			</div>
			<div className={styles["item_footer"]}>
				<div className={styles["item_price"]}>
					{formatCurrency(product.total)}
				</div>
				<div className={styles["qty_controls"]}>
					<Button onPress={() => handleQty("deduct", product.id)}>-</Button>
					<p>{qty}</p>
					<Button onPress={() => handleQty("add", product.id)}>+</Button>
				</div>
			</div>
		</div>
	);
}
