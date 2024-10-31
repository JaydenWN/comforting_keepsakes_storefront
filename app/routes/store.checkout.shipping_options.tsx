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
import AddressPreview from "../components/Checkout/Address_Preview";
import ShippingOption from "../components/Checkout/Shipping_Option";
import styles from "../components/Checkout/shipping_option.module.css";
import CheckoutTotals from "../components/Checkout/Checkout_Totals";
import { useState } from "react";

export const meta: MetaFunction = () => {
	return [
		{ title: "Comforting Keepsakes | Checkout" },
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

	const [selectedShipping, setSelectedShipping] = useState();

	function handleSubmit(e) {
		e.preventDefault();

		submit({ shipping_option: selectedShipping.id }, { method: "post" });
	}
	return (
		<>
			<Form
				validationErrors={actionData?.errors}
				onSubmit={(e) => handleSubmit(e)}
				method="post"
				className={`${styles["shipping_form"]} section-p`}
			>
				<RadioGroup
					name="shipping_option"
					isRequired
					onChange={(e) => setSelectedShipping(e)}
				>
					<Label>Shipping Options</Label>
					{shipping_options.length > 0
						? shipping_options.map((option) => (
								<ShippingOption option={option} key={option.id} />
							))
						: null}
				</RadioGroup>

				<AddressPreview shipping_address={cart?.shipping_address} />

				<CheckoutTotals cart={cart} selectedShipping={selectedShipping} />

				<Button type="submit" className="primary_button">
					Continue
				</Button>
			</Form>
		</>
	);
}
