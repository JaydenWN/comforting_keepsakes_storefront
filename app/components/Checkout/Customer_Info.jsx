import { TextField, Label, Input, FieldError } from "react-aria-components";
import styles from "./customer_info.module.css";
export default function Customer_Info({ loaderData }) {
	return (
		<>
			<h2>Customer Details</h2>
			<div className={`${styles["customer_details"]} section-p`}>
				<div className={styles["customer_name"]}>
					<TextField
						name="first_name"
						type="text"
						isRequired
						value={loaderData?.first_name || undefined}
						autoComplete="given-name"
					>
						<Label>First Name</Label>
						<Input />
						<FieldError className={"form_error"} />
					</TextField>

					<TextField
						name="last_name"
						type="text"
						isRequired
						value={loaderData?.last_name || undefined}
						autoComplete="family-name"
					>
						<Label>Last Name</Label>
						<Input />
						<FieldError className={"form_error"} />
					</TextField>
				</div>
				<TextField
					type="email"
					name="email"
					isRequired
					value={loaderData?.email || undefined}
					autoComplete="email"
				>
					<Label>Email</Label>
					<Input />
					<FieldError className={"form_error"} />
				</TextField>

				<TextField type="tel" name="phone" isRequired autoComplete="tel">
					<Label>Phone</Label>
					<Input />
					<FieldError className={"form_error"} />
				</TextField>
			</div>
		</>
	);
}
