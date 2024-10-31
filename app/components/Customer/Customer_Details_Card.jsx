import styles from "./customer_details_card.module.css";
import EditDetailsModal from "./Edit_Details_Modal";

export default function Customer_Details_Card({
	phone,
	email,
	billing_address,
}) {
	return (
		<div className={`${styles["customer_details"]} section-p`}>
			<div className={styles["details_header"]}>
				<p>Customer Details</p>
				<EditDetailsModal
					phone={phone}
					email={email}
					billing_address={billing_address}
				/>
			</div>
			<div className={styles["details_card"]}>
				<div className={styles["detail"]}>
					<p>Contact Information </p>
					<p>{phone}</p>
					<p>{email}</p>
				</div>
				{billing_address && (
					<div className={styles["detail"]}>
						<p>Postal Address</p>
						<p>{billing_address.address_1}</p>
						<p>{billing_address.address_2}</p>
						<p>{billing_address.province}</p>
						<p>{billing_address.postal_code}</p>
					</div>
				)}
			</div>
		</div>
	);
}
