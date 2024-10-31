import Product_Display_Card from "./Product_Display_Card";
import styles from "./category_display.module.css";

export default function Category_Display({ products, title }) {
	return (
		<div className={styles["product_display"]}>
			<h2 className={styles["title"]}>{title}</h2>
			<div className={styles["products"]}>
				{products.map((product) => (
					<Product_Display_Card product={product} key={product.title} />
				))}
			</div>
		</div>
	);
}
