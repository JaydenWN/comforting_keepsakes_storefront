import {
	DialogTrigger,
	Button,
	Modal,
	Dialog,
	Input,
	FieldError,
	ModalOverlay,
	Form,
	Label,
	TextField,
} from "react-aria-components";

import styles from "./edit_details_modal.module.css";
import { useActionData, useFetcher } from "@remix-run/react";

export default function Edit_Details_Modal({ phone, billing_address }) {
	const actionData = useActionData();

	function handleSubmit(e) {
		e.preventDefault();

		fetcher.submit(e.currentTarget);
	}

	return (
		<DialogTrigger>
			<Button>
				<img src="/icons/edit_icon.svg" alt="edit" />
			</Button>
			<ModalOverlay className={styles["edit_overlay"]}>
				<Modal isKeyboardDismissDisabled className={styles["edit_modal"]}>
					<Dialog>
						{({ close }) => (
							<div className={styles["edit_details_card"]}>
								<Form
									className={styles["edit_details_form"]}
									validationErrors={actionData?.errors}
									method="POST"
									onSubmit={(e) => handleSubmit(e)}
								>
									<TextField
										type="tel"
										name="tel"
										autoComplete="tel"
										placeholder={phone}
										className={styles["input_group"]}
										defaultValue={phone}
									>
										<Label>Phone</Label>
										<FieldError className={styles["field_error"]} />
										<Input />
									</TextField>

									<TextField
										type="text"
										name="address_1"
										className={styles["input_group"]}
										placeholder={billing_address?.address_1}
										defaultValue={billing_address?.address_1}
									>
										<Label>Address Line 1</Label>
										<Input />
										<FieldError className={"form_error"} />
									</TextField>

									<TextField
										type="text"
										name="address_2"
										className={styles["input_group"]}
										placeholder={billing_address?.address_2}
										defaultValue={billing_address?.address_2}
									>
										<Label>Address Line 2</Label>
										<Input />
										<FieldError className={"form_error"} />
									</TextField>

									<TextField
										type="text"
										name="city"
										className={styles["input_group"]}
										placeholder={billing_address?.city}
										defaultValue={billing_address?.city}
									>
										<Label>City</Label>
										<Input />
										<FieldError className={"form_error"} />
									</TextField>

									<div className={styles["state-postal"]}>
										<TextField
											type="text"
											name="state"
											className={styles["input_group"]}
											placeholder={billing_address?.province}
											defaultValue={billing_address?.province}
										>
											<Label>State</Label>
											<Input />
											<FieldError className={"form_error"} />
										</TextField>

										<TextField
											type="text"
											name="postal_code"
											autoComplete="postal-code"
											className={styles["input_group"]}
											placeholder={billing_address?.postal_code}
											defaultValue={billing_address?.postal_code}
										>
											<Label>Postal Code</Label>
											<Input />
											<FieldError className={"form_error"} />
										</TextField>
									</div>

									<div className={styles["buttons"]}>
										<Button
											type="button"
											className="primary_button"
											onPress={close}
										>
											Close
										</Button>
										<Button
											type="submit"
											className="primary_button"
											onPress={close}
										>
											Update
										</Button>
									</div>
								</Form>
							</div>
						)}
					</Dialog>
				</Modal>
			</ModalOverlay>
		</DialogTrigger>
	);
}
