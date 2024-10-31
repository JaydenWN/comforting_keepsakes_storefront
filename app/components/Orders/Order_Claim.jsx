import {
	Form,
	TextField,
	Label,
	Input,
	FieldError,
	Button,
} from "react-aria-components";
import styles from "./order_claim.module.css";
export default function Order_Claim({ handleSubmit, fetcher }) {
	if (fetcher?.data?.errors.confirmation) {
		return (
			<div className={styles["confirmation"]}>
				<div className={styles["notification"]}>
					<img src="/icons/checkmark_icon.svg" alt="checkmark" />
					<p>Successful Submission.</p>
				</div>
				<p>{fetcher?.data?.errors.confirmation}</p>
			</div>
		);
	}
	return (
		<Form
			method="post"
			validationErrors={fetcher?.data?.errors}
			onSubmit={(e) => handleSubmit(e)}
			className={styles["order_claim"]}
		>
			<TextField name="order_id" isRequired>
				<Label>Order ID</Label>
				<FieldError className={styles["field_error"]}>
					{fetcher.data?.errors?.order_id}
				</FieldError>
				<Input />
			</TextField>
			<Button type="submit" className={"primary_button"}>
				Submit
			</Button>
		</Form>
	);
}
