import { json, type MetaFunction } from "@remix-run/node";
import { requireUser } from "~/utils/requireUser.server.js";
import medusa from "~/utils/medua-client";
import { useActionData, useLoaderData, useSubmit } from "@remix-run/react";
import { getSession } from "~/utils/createUserSession.server";
import {
	Button,
	FieldError,
	Form,
	Input,
	Label,
	TextField,
} from "react-aria-components";
import { redirect } from "@remix-run/node";

export const meta: MetaFunction = () => {
	return [
		{ title: "Finvision | Forgot Password" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};
export async function action({ request, params }) {
	const { token } = params;
	const formData = await request.formData();
	const { password, email } = Object.fromEntries(formData);

	try {
		const { response } = await medusa.customers.resetPassword({
			email,
			token,
			password,
		});

		if (response.status === 200) {
			return redirect("/store/customer/reset_password/success");
		}
	} catch (error) {
		console.error("Password reset error:", error);
		return json({
			errors: { email: "Email does not exist or token is invalid." },
		});
	}
}
export async function loader({ request }) {
	return null;
}

export default function ForgotPassword() {
	const loaderData = useLoaderData();
	const actionData = useActionData();
	// replace fetcher
	const submit = useSubmit();

	function handleSubmit(e) {
		e.preventDefault();
		submit(e.currentTarget);
	}

	return (
		<>
			<h1>Forgot Password</h1>
			<Form
				method="post"
				validationErrors={actionData?.errors}
				onSubmit={(e) => handleSubmit(e)}
			>
				<TextField type="email" isRequired name="email">
					<Label>Email</Label>
					<Input />
					<FieldError />
				</TextField>
				<TextField type="password" isRequired name="password">
					<Label>New Password</Label>
					<Input />
					<FieldError />
				</TextField>
				<Button type="submit">Submit</Button>
			</Form>
		</>
	);
}
