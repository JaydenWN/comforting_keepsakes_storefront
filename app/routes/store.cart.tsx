import type { MetaFunction } from "@remix-run/node";
import medusa from "../utils/medua-client";
import createCart from "../utils/createCart";
import { json } from "@remix-run/node";
import { cartID } from "../utils/createCartCookie";
import { NavLink, useFetcher, useLoaderData } from "@remix-run/react";
import { getSession } from "~/utils/createUserSession.server";
import Page_Header from "~/components/Misc/Page_Header";
import CartItem from "../components/Cart/Cart_Item";
import styles from "../components/Cart/cart.module.css";
import CartTotals from "../components/Cart/Cart_Totals";
import NoItems from "../components/Cart/No_Items";
export const meta: MetaFunction = () => {
	return [
		{ title: "Comforting Keepsakes | Cart" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export async function action({ request }) {
	const cartCookie = await request.headers.get("Cookie");
	const cart_id = await cartID.parse(cartCookie);

	if (request.method === "POST") {
		const formData = await request.formData();
		const customText = formData.get("custom_text");

		if (customText?.length > 28) {
			return json({ errors: { custom_text: "Too many characters." } });
		}

		async function addLineItem(cart_id) {
			const lineItemData = {
				quantity: 1,
				variant_id: formData.get("variant_id"),
				...(customText && { metadata: { custom_text: customText } }),
			};

			await medusa.carts.lineItems.create(cart_id, lineItemData);
		}

		// If cart doesn't exist, create one.
		if (!cart_id) {
			const { cart } = await medusa.carts.create();

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

	if (request.method === "DELETE") {
		const formData = await request.formData();
		const { line_id } = Object.fromEntries(formData);

		await medusa.carts.lineItems.delete(cart_id, line_id);
	}

	if (request.method === "PATCH") {
		const formData = await request.formData();
		const { line_id, newQty } = Object.fromEntries(formData);
		await medusa.carts.lineItems.update(cart_id, line_id, {
			quantity: Number(newQty),
		});
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
	const fetcher = useFetcher();

	// Remove Line Item from the customers cart.
	function handleRemove(line_id) {
		const formData = new FormData();
		formData.set("line_id", line_id);
		fetcher.submit(formData, { method: "DELETE" });
	}
	console.log(loaderData);

	return (
		<section className="gutter-p">
			<Page_Header title={"Cart"} />
			<div className="section-p">
				<div className={`${styles["cart_items"]} section-p`}>
					{loaderData?.cart?.items.map((item) => (
						<CartItem
							product={item}
							key={item.id}
							handleRemove={handleRemove}
						/>
					))}
				</div>

				{loaderData?.cart?.items.length >= 1 ? (
					<div className={styles["cart_footer"]}>
						<CartTotals subTotal={loaderData.cart?.total} />
						<NavLink
							to={"/store/checkout/customer_details"}
							className={`primary_button ${styles["checkout_button"]}`}
						>
							Proceed to Checkout
						</NavLink>
					</div>
				) : (
					<NoItems />
				)}
			</div>
		</section>
	);
}
