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

export const meta: MetaFunction = () => {
	return [
		{ title: "Comforting Keepsakes | Forgot Password" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};
export async function action({ request }) {
	const formData = await request.formData();
	const { email } = Object.fromEntries(formData);
	await medusa.customers
		.generatePasswordToken({ email })
		.then((res) => {
			console.log(res);
			// return json({ access_token });
		})
		.catch((e) => {
			return json({ errors: { email: "Email does not exist." } });
		});
	return null;
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
				<Button type="submit">Submit</Button>
			</Form>
		</>
	);
}
