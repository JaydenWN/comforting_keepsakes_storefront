import medusa from "./medua-client";
import { json } from "@remix-run/react";
import { cartID } from "./createCartCookie";

export default async function createCart(session) {
	const { cart } = await medusa.carts.create();
	const cartCookie = await cartID.serialize(cart.id);

	if (session) {
		const customer = await session.get("customer");
		await medusa.carts.update(cart.id, { customer_id: customer.id });
	}
	return json(
		{ cart_id: cart.id, cart: cart },
		{
			headers: {
				"Set-Cookie": cartCookie,
			},
		},
	);
}
