import { json, type MetaFunction } from "@remix-run/node";
import {
	Outlet,
	useActionData,
	useLoaderData,
	useSubmit,
} from "@remix-run/react";
import { redirect } from "@remix-run/node";
import medusa from "~/utils/medua-client";
import { cartID } from "~/utils/createCartCookie";
import {
	Form,
	Label,
	Text,
	RadioGroup,
	Radio,
	FieldError,
	Input,
	Button,
} from "react-aria-components";

export const meta: MetaFunction = () => {
	return [
		{ title: "Finvision | Checkout" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};
export async function action({ request }) {
	const cartCookie = await request.headers.get("Cookie");
	const cart_id = await cartID.parse(cartCookie);
	const formData = await request.formData();
	const { shipping_option } = Object.fromEntries(formData);

	if (request.method === "POST") {
		await medusa.carts.addShippingMethod(cart_id, {
			option_id: shipping_option,
		});

		return redirect("/store/checkout/payment");
	}
	return null;
}

export async function loader({ request }) {
	const cartCookie = await request.headers.get("Cookie");
	const cart_id = await cartID.parse(cartCookie);

	const { cart } = await medusa.carts.retrieve(cart_id);
	const { shipping_options } =
		await medusa.shippingOptions.listCartOptions(cart_id);

	return json({ cart, shipping_options });
}

export default function Checkout() {
	const { cart, shipping_options } = useLoaderData();
	const submit = useSubmit();
	const actionData = useActionData();

	function handleSubmit(e) {
		e.preventDefault();
		submit(e.currentTarget);
	}
	return (
		<>
			<h2>Checkout | Shipping</h2>

			<Form
				validationErrors={actionData?.errors}
				onSubmit={(e) => handleSubmit(e)}
				method="post"
			>
				<RadioGroup name="shipping_option" isRequired>
					<Label>Shipping option</Label>
					{shipping_options.length > 0
						? shipping_options.map((option) => (
								<Radio key={option.id} value={option.id}>
									{option.name}
								</Radio>
							))
						: null}
				</RadioGroup>
				<Button type="submit">Continue</Button>
			</Form>
		</>
	);
}
