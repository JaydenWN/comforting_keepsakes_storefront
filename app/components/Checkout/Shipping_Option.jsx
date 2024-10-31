import { Radio } from "react-aria-components";
import styles from "./shipping_option.module.css";
import formatCurrency from "../../utils/format_currency";
export default function Shipping_Option({ option }) {
	return (
		<Radio key={option.id} value={option} className={styles["shipping_option"]}>
			<div className={styles["img_wrapper"]}>
				<img src={option.metadata?.icon} alt="img" />
			</div>
			<div className={styles["shipping_description"]}>
				<div className={styles["shipping_header"]}>
					<p>{option.name}</p>
					<span className={styles["price"]}>
						{formatCurrency(option.price_incl_tax)}
					</span>
				</div>
				{option.metadata?.days && (
					<p>Delivers within {option.metadata?.days} business days.</p>
				)}
			</div>
		</Radio>
	);
}
