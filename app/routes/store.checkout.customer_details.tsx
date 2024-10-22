import { json, type MetaFunction } from "@remix-run/node";
import { cartID } from "~/utils/createCartCookie";
import {
	redirect,
	useActionData,
	useLoaderData,
	useSubmit,
} from "@remix-run/react";
import {
	FieldError,
	Form,
	TextField,
	Label,
	Input,
	Button,
} from "react-aria-components";
import medusa from "~/utils/medua-client";
import { getSession } from "~/utils/createUserSession.server";

export const meta: MetaFunction = () => {
	return [
		{ title: "Finvision | Checkout" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export async function action({ request }) {
	const session = await getSession(request.headers.get("Cookie"));
	const customer = session.get("customer");

	const cartCookie = await request.headers.get("Cookie");
	const cart_id = await cartID.parse(cartCookie);
	const formData = await request.formData();
	const {
		first_name,
		last_name,
		email,
		phone,
		address_1,
		address_2,
		city,
		state,
		postal_code,
	} = Object.fromEntries(formData);

	try {
		const cartUpdateData = {
			email,
			shipping_address: {
				address_1,
				address_2,
				city,
				province: state,
				postal_code,
				phone,
				first_name,
				last_name,
			},
		};
		if (customer) {
			cartUpdateData.customer_id = customer.id;
		}
		await medusa.carts.update(cart_id, cartUpdateData);

		return redirect("/store/checkout/shipping_options");
	} catch (e) {
		console.log(e);
	}

	return null;
}

export async function loader({ request }) {
	const session = await getSession(request.headers.get("Cookie"));

	const customer = session.get("customer");
	if (!customer) {
		return null;
	}

	const { first_name, last_name, email } = customer;

	return json({ first_name, last_name, email });
}

export default function CustomerDetails() {
	const loaderData = useLoaderData();
	const actionData = useActionData();

	const submit = useSubmit();
	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		submit(e.currentTarget);
	};
	return (
		<Form
			method="post"
			action="/store/checkout/customer_details"
			validationErrors={actionData?.errors}
			onSubmit={onSubmit}
		>
			<TextField
				name="first_name"
				type="text"
				isRequired
				value={loaderData?.first_name || undefined}
				autoComplete="given-name"
			>
				<Label>First Name</Label>
				<Input />
				<FieldError />
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
				<FieldError />
			</TextField>

			<TextField
				type="email"
				name="email"
				isRequired
				value={loaderData?.email || undefined}
				autoComplete="email"
			>
				<Label>Email</Label>
				<Input />
				<FieldError />
			</TextField>

			<TextField type="text" name="address_1" isRequired>
				<Label>Address Line 1</Label>
				<Input />
				<FieldError />
			</TextField>

			<TextField type="text" name="address_2">
				<Label>Address Line 2</Label>
				<Input />
				<FieldError />
			</TextField>

			<TextField type="text" name="city" isRequired>
				<Label>City</Label>
				<Input />
				<FieldError />
			</TextField>

			<TextField type="text" name="state" isRequired>
				<Label>State</Label>
				<Input />
				<FieldError />
			</TextField>

			<TextField
				type="text"
				name="postal_code"
				isRequired
				autoComplete="postal-code"
			>
				<Label>Postal Code</Label>
				<Input />
				<FieldError />
			</TextField>

			<TextField type="text" name="phone" isRequired autoComplete="tel">
				<Label>Phone</Label>
				<Input />
				<FieldError />
			</TextField>

			<Button type="submit">Continue</Button>
		</Form>
	);
}
