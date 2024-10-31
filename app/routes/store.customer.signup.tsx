import type { MetaFunction } from "@remix-run/node";
import { Form } from "react-aria-components";
import { useActionData, useSubmit, NavLink, redirect } from "@remix-run/react";
import { useState } from "react";
import medusa from "~/utils/medua-client";
import { commitSession, getSession } from "~/utils/createUserSession.server";
import SignupForm from "../components/Customer/Signup_Form";
import Page_Header from "~/components/Misc/Page_Header";
import styles from "../components/Customer/signup_form.module.css";

export const meta: MetaFunction = () => {
	return [
		{ title: "Comforting Keepsakes | Sign Up" },
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
		<section className="gutter-m">
			<Page_Header title={"Sign Up"} />

			<div className={styles["signup_header"]}>
				<p>Sign up for a keepsake account.</p>
				<p>
					Already have an account?{" "}
					<NavLink to={"/store/customer/login"}>Login.</NavLink>
				</p>
			</div>

			<Form
				method="post"
				onSubmit={(e) => handleSubmit(e)}
				validationErrors={actionData?.errors}
				className="section-p"
			>
				{actionData?.errors.other === "duplicate" && (
					<p>
						An account already exists with that email. Please{" "}
						<NavLink to={"/store/customer/login"}>Log in</NavLink> instead.
					</p>
				)}
				<SignupForm
					password={password}
					passwordErrors={passwordErrors}
					setPasswordActive={setPasswordActive}
					passwordActive={passwordActive}
					setPassword={setPassword}
				/>
			</Form>
		</section>
	);
}
