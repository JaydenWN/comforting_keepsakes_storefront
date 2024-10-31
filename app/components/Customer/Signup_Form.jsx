import styles from "./signup_form.module.css";
import {
	Label,
	TextField,
	Input,
	Button,
	FieldError,
} from "react-aria-components";

export default function Signup_Form({
	passwordErrors,
	setPasswordActive,
	password,
	setPassword,
	passwordActive,
}) {
	return (
		<div className={`${styles["signup_form"]}`}>
			<TextField
				type="text"
				name="first_name"
				isRequired
				autoComplete="given-name"
			>
				<Label>First Name</Label>
				<Input />
				<FieldError className={styles["field_error"]} />
			</TextField>

			<TextField
				type="text"
				name="last_name"
				isRequired
				autoComplete="family-name"
			>
				<Label>Last Name</Label>
				<Input />
				<FieldError className={styles["field_error"]} />
			</TextField>
			<TextField type="email" name="email" isRequired autoComplete="email">
				<Label>Email</Label>
				<Input />
				<FieldError className={styles["field_error"]} />
			</TextField>
			<TextField
				type="password"
				name="password"
				isRequired
				isInvalid={passwordErrors.length > 0}
				value={password}
				onChange={setPassword}
				onFocus={() => setPasswordActive(true)}
				onBlur={() => setPasswordActive(false)}
			>
				<Label>Password</Label>
				<Input />

				<FieldError className={styles["field_error"]}>
					{passwordActive && passwordErrors.length > 0 && (
						<ul>
							{passwordErrors.map((error, i) => (
								<li key={i}>{error}</li>
							))}
						</ul>
					)}
				</FieldError>
			</TextField>

			<Button type="submit" className={"primary_button"}>
				Sign Up
			</Button>
		</div>
	);
}
