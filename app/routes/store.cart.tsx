import type { MetaFunction } from "@remix-run/node";
import medusa from "../utils/medua-client";
import createCart from "../utils/createCart";
import { json } from "@remix-run/node";
import { cartID } from "../utils/createCartCookie";
import { NavLink, useLoaderData } from "@remix-run/react";
import { getSession } from "~/utils/createUserSession.server";

export const meta: MetaFunction = () => {
	return [
		{ title: "Finvision | Cart" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export async function action({ request }) {
	const cartCookie = await request.headers.get("Cookie");
	const cart_id = await cartID.parse(cartCookie);

	if (request.method === "POST") {
		const formData = await request.formData();

		async function addLineItem(cart_id) {
			await medusa.carts.lineItems.create(cart_id, {
				quantity: 1,
				variant_id: formData.get("variant_id"),
			});
		}

		// If cart doesn't exist, create one.
		if (!cart_id) {
			const { cart } = await medusa.carts.create();

			console.log(cart);
			const cartCookie = await cartID.serialize(cart.id);
			addLineItem(cart.id);
			const session = await getSession(request.headers.get("Cookie"));
			const customer = session.get("customer");
			// if customer logged in, associate the cart with the user.
			if (customer) {
				await medusa.carts
					.update(cart.id, { customer_id: customer.id })
					.then(({ cart }) => console.log(cart));
			}

			return json(
				{ cart_id: cart.id },
				{
					headers: {
						"Set-Cookie": cartCookie,
					},
				},
			);
		}
		// If there is a cart
		if (cart_id) {
			addLineItem(cart_id);
		}
	}

	return null;
}

export async function loader({ request }) {
	const cartCookieHeader = request.headers.get("Cookie");
	const cart_id = await cartID.parse(cartCookieHeader);

	//  If cart exists, retrieve it.
	if (cart_id) {
		const { cart } = await medusa.carts.retrieve(cart_id);
		return json({ cart_id, cart });
	}

	// If cart doesn't exist, create one.
	if (!cart_id) {
		// If the customer is logged in, ensures that the customer is associated with it.
		const session = await getSession(request.headers.get("Cookie"));
		const customerLoggedIn = await session.has("customer");
		if (customerLoggedIn) {
			return await createCart(session);
		}
		return await createCart();
	}

	return null;
}

export default function Cart() {
	const loaderData = useLoaderData();
	console.log(loaderData);
	return (
		<>
			<h1>Cart</h1>
			<ul>
				{loaderData?.cart?.items.map((item) => (
					<li key={item.variant.id}>
						{item.title} - {item.variant.title} - {item.quantity}
					</li>
				))}
			</ul>
			<NavLink to={"/store/checkout/customer_details"}>Checkout</NavLink>
		</>
	);
}
