import styles from "./address_preview.module.css";
export default function Address_Preview({ shipping_address }) {
	return (
		<div className={styles["address_preview"]}>
			<div>
				<p>Address Line 1</p>
				<p>{shipping_address.address_1}</p>
			</div>
			{shipping_address.address_2.length > 1 ? (
				<div>
					<p>Address Line 2</p>
					<p>{shipping_address.address_2}</p>
				</div>
			) : null}
			<div>
				<p>City</p>
				<p>{shipping_address.city}</p>
			</div>
			<div>
				<p>State</p>
				<p>{shipping_address.province}</p>
			</div>
			<div>
				<p>Postal Code</p>
				<p>{shipping_address.postal_code}</p>
			</div>
		</div>
	);
}
