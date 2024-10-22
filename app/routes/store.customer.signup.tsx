import type { MetaFunction } from "@remix-run/node";
import {
	FieldError,
	Form,
	Label,
	TextField,
	Input,
	Button,
} from "react-aria-components";
import { useActionData, useSubmit, NavLink, redirect } from "@remix-run/react";
import { useState } from "react";
import medusa from "~/utils/medua-client";
import { commitSession, getSession } from "~/utils/createUserSession.server";

export const meta: MetaFunction = () => {
	return [
		{ title: "Finvision | Sign Up" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export async function action({ request }) {
	if (request.method === "POST") {
		try {
			const formData = await request.formData();
			const { email, password, first_name, last_name } =
				Object.fromEntries(formData);

			try {
				const { customer } = await medusa.customers.create({
					email,
					password,
					first_name,
					last_name,
				});
				const session = await getSession(request.headers.get("Cookie"));
				session.set("customer", customer);
				const userCookieSession = await commitSession(session);

				return redirect("/store/customer", {
					headers: { "Set-Cookie": userCookieSession },
				});
			} catch (e) {
				if (e.response.data.type === "duplicate_error") {
					return {
						errors: {
							other: "duplicate",
						},
					};
				}
			}
		} catch (e) {
			console.log(e);
			return {
				errors: {
					password: "",
					email: "",
				},
			};
		}
	}
	return null;
}
export default function CustomerSignup() {
	const submit = useSubmit();
	const actionData = useActionData();
	const [password, setPassword] = useState("");
	const [passwordActive, setPasswordActive] = useState(false);
	const passwordErrors = [];

	if (password.length < 8) {
		passwordErrors.push("Password must be 8 characters or more.");
	}
	if ((password.match(/[A-Z]/g) ?? []).length < 1) {
		passwordErrors.push("Password must include at least 1 upper case letter");
	}
	if ((password.match(/[^a-z]/gi) ?? []).length < 1) {
		passwordErrors.push("Password must include at least 1 symbol.");
	}
	if (actionData?.errors.password) {
		passwordErrors.push(actionData.errors.password);
	}
	function handleSubmit(e) {
		e.preventDefault();
		submit(e.currentTarget);
	}

	return (
		<Form
			method="post"
			onSubmit={(e) => handleSubmit(e)}
			validationErrors={actionData?.errors}
		>
			{actionData?.errors.other === "duplicate" && (
				<p>
					An account already exists with that email. Please{" "}
					<NavLink to={"/store/customer/login"}>Log in</NavLink> instead.
				</p>
			)}
			<TextField
				type="text"
				name="first_name"
				isRequired
				autoComplete="given-name"
			>
				<Label>First Name</Label>
				<Input />
				<FieldError />
			</TextField>

			<TextField
				type="text"
				name="last_name"
				isRequired
				autoComplete="family-name"
			>
				<Label>Last Name</Label>
				<Input />
				<FieldError />
			</TextField>
			<TextField type="email" name="email" isRequired autoComplete="email">
				<Label>Email</Label>
				<Input />
				<FieldError />
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

				<FieldError>
					{passwordActive && passwordErrors.length > 0 && (
						<ul>
							{passwordErrors.map((error, i) => (
								<li key={i}>{error}</li>
							))}
						</ul>
					)}
				</FieldError>
			</TextField>

			<Button type="submit">Sign Up</Button>
		</Form>
	);
}
