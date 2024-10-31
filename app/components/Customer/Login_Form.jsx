import {
	TextField,
	Label,
	Input,
	FieldError,
	Button,
} from "react-aria-components";
import styles from "./login_form.module.css";

export default function Login_Form() {
	return (
		<>
			<TextField type="email" name="email" isRequired autoComplete="email">
				<Label>Email</Label>
				<FieldError className={styles["field_error"]} />
				<Input />
			</TextField>

			<TextField type="password" name="password" isRequired>
				<Label>Password</Label>
				<FieldError className={styles["field_error"]} />
				<Input />
			</TextField>

			<Button type="submit" className={"primary_button"}>
				Login
			</Button>
		</>
	);
}
