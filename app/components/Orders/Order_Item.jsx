import formatCurrency from "../../utils/format_currency";
import styles from "./order_item.module.css";
export default function Order_Item({ item }) {
	return (
		<div className={styles["item"]}>
			<div className={styles["item_img"]}>
				<img src={item?.thumbnail} alt={item?.title} />
			</div>
			<div className={styles["item_description"]}>
				<div className={styles["description_head"]}>
					<p className={styles["title"]}>{item?.title}</p>
					<p className={styles["item_quantity"]}>x{item?.quantity}</p>
				</div>
				<p className={styles["description"]}>{item?.description}</p>
				<p className={styles["price"]}>{formatCurrency(item?.total)}</p>
			</div>
		</div>
	);
}
