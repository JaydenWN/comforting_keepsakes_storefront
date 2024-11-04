import styles from "./product_display.module.css";
import formatCurrency from "../../utils/format_currency";
export default function Product_Display({ imgs, price, description, title }) {
	return (
		<div className={styles["product_display"]}>
			<div className={styles["product_image_container"]}>
				{imgs.map((image) => (
					<img src={image.url} alt={title} key={image.id} />
				))}
			</div>
			<div className={styles["product_description"]}>
				<h1>{title}</h1>
				<p className={styles["product_price"]}>{formatCurrency(price)}</p>
				<p>{description}</p>
			</div>
		</div>
	);
}
