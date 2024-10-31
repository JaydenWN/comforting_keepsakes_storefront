import { NavLink } from "@remix-run/react";
import styles from "./product_display_card.module.css";
export default function Product_Display_Card({ product }) {
	return (
		<div className={styles["product_card"]}>
			<div className={styles["product_image"]}>
				<img src={product.thumbnail} alt={product.title} />
			</div>
			<p className={styles["product_title"]}>{product.title}</p>
			<NavLink
				to={`/store/product/${product.handle}`}
				className={"primary_button"}
			>
				View Product
			</NavLink>
		</div>
	);
}
