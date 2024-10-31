import { TextField, Label, Input, FieldError } from "react-aria-components";
import styles from "./postal_details.module.css";

export default function Postal_Details() {
	return (
		<>
			{" "}
			<h2>Postal Details</h2>
			<div className={[`${styles["postal_details"]} section-p`]}>
				<TextField type="text" name="address_1" isRequired>
					<Label>Address Line 1</Label>
					<Input />
					<FieldError className={"form_error"} />
				</TextField>

				<TextField type="text" name="address_2">
					<Label>Address Line 2</Label>
					<Input />
					<FieldError className={"form_error"} />
				</TextField>

				<TextField type="text" name="city" isRequired>
					<Label>City</Label>
					<Input />
					<FieldError className={"form_error"} />
				</TextField>

				<div className={styles["state-postal"]}>
					<TextField type="text" name="state" isRequired>
						<Label>State</Label>
						<Input />
						<FieldError className={"form_error"} />
					</TextField>

					<TextField
						type="text"
						name="postal_code"
						isRequired
						autoComplete="postal-code"
					>
						<Label>Postal Code</Label>
						<Input />
						<FieldError className={"form_error"} />
					</TextField>
				</div>
			</div>
		</>
	);
}
