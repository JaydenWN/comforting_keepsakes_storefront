import fortmatCurrency from "../../utils/format_currency";
import styles from "./order_summary.module.css";
import OrderItem from "./Order_Item";
import { NavLink } from "@remix-run/react";

export default function Order_Summary({ order }) {
	const date = new Date(order.created_at);

	const formattedDate = new Intl.DateTimeFormat("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	}).format(date);

	const { address_1, address_2, city, postal_code, province } =
		order.shipping_address;

	const trackingId = order.fulfillments[0]?.tracking_links[0]?.tracking_number;

	return (
		<div className={styles["order_summary"]}>
			<div className={styles["summary_head"]}>
				<p className={styles["date"]}>{formattedDate}</p>
			</div>
			<div className={styles["order_items"]}>
				{order.items.map((item) => (
					<OrderItem item={item} key={item.id} />
				))}
			</div>
			<div className={styles["summary_footer"]}>
				<div className={styles["postal"]}>
					<p>{address_1}</p>
					<p>{address_2}</p>
					<p>{city}</p>
					<p>{province}</p>
					<p>{postal_code}</p>
				</div>
				<div className={styles["total"]}>
					<p>{fortmatCurrency(order.total)}</p>
				</div>
			</div>
			<p className={styles["order_id"]}>{order.id.slice(6)}</p>
			{trackingId && (
				<NavLink
					to={`https://auspost.com.au/mypost/track/#/details/${trackingId}`}
					className={`${styles["tracking"]} primary_button`}
				>
					Track Package
				</NavLink>
			)}
		</div>
	);
}
