import { json, type MetaFunction } from "@remix-run/node";
import { requireUser } from "~/utils/requireUser.server.js";
import medusa from "~/utils/medua-client";
import { useActionData, useFetcher, useLoaderData } from "@remix-run/react";
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
		{ title: "Finvision | Orders" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export async function action({ request }) {
	const formData = await request.formData();
	const { order_id } = Object.fromEntries(formData);
	const headers = {
		"user-agent": request.headers.get("user-agent"),
		cookie: request.headers.get("cookie"),
		accept: request.headers.get("accept"),
		"accept-language": request.headers.get("accept-language"),
	};
	if (!order_id) {
		return json({
			errors: { order_id: "Please provide a order identification number." },
		});
	}

	try {
		await medusa.orders.retrieve(order_id);

		await medusa.orders.requestCustomerOrders(
			{ order_ids: [order_id] },
			headers,
		);

		await medusa.orders.requestCustomerOrders(
			{ order_ids: [order_id] },
			headers,
		);

		return json({
			errors: { confirmation: "Please Check your email for verification." },
		});
	} catch (e) {
		console.log(e);
		return json({
			errors: {
				confirmation: "Could'nt find an order with that identification number",
			},
		});
	}
}

export async function loader({ request }) {
	await requireUser(request);

	return null;
}

export default function CustomerOrders() {
	const loaderData = useLoaderData();
	const actionData = useActionData();
	const fetcher = useFetcher();

	function handleSubmit(e) {
		e.preventDefault();
		fetcher.submit(e.currentTarget, {
			method: "post",
		});
	}

	return (
		<>
			<h2>Order Claim</h2>
			<p>{fetcher?.data?.errors.confirmation}</p>
			<Form
				method="post"
				validationErrors={fetcher?.data?.errors}
				onSubmit={(e) => handleSubmit(e)}
			>
				<TextField name="order_id" isRequired>
					<Label>Order Id</Label>
					<Input />
					<FieldError>{fetcher.data?.errors?.order_id}</FieldError>
				</TextField>
				<Button type="submit">Submit</Button>
			</Form>
		</>
	);
}
