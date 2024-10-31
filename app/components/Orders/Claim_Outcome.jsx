import styles from "./claim_outcome.module.css";

export default function Claim_Outcome({ success }) {
	return (
		<div className={styles["claim_outcome"]}>
			<div className={styles["claim_notification"]}>
				{success ? (
					<>
						<img src="/icons/checkmark_icon.svg" alt="checkmark" />
						<p>Claim Successful.</p>
					</>
				) : (
					<>
						<img src="/icons/x_mark_icon_dark.svg" alt="failure" />
						<p>Couldn't Process Claim.</p>
					</>
				)}
			</div>

			{success ? (
				<p>
					Your order claim was successful and your order has been assigned to
					your account.
				</p>
			) : (
				<p>There was an error claiming your order. </p>
			)}
		</div>
	);
}
