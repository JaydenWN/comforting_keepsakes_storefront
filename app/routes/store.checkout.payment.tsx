import { json, type MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/react";
import medusa from "~/utils/medua-client";
import { cartID } from "~/utils/createCartCookie";
import { Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { useLoaderData } from "@remix-run/react";
import { loadStripe } from "@stripe/stripe-js";
import StripeForm from "../components/Cart/StripeForm";

export const meta: MetaFunction = () => {
	return [
		{ title: "Finvision | Checkout Payment" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};
export async function action({ request }) {
	const cartCookie = await request.headers.get("Cookie");
	const cart_id = await cartID.parse(cartCookie);

	if (request.method === "POST" && cart_id) {
		const { cart } = await medusa.carts.retrieve(cart_id);
		console.log(cart);
		await medusa.carts.complete(cart_id);

		// Clear the cookie by setting it with an expired date
		const cookieHeader = await cartID.serialize("", {
			maxAge: 1, // Sets the cookie to expire immediately
			expires: new Date(0), // Ensure the cookie is expired
			path: "/", // Ensure it applies to the same path as the original cookie
		});

		return redirect("/store/checkout/confirmation", {
			headers: {
				"Set-Cookie": cookieHeader,
			},
		});
	}
	return null;
}
export async function loader({ request }) {
	const cartCookie = await request.headers.get("Cookie");
	const cart_id = await cartID.parse(cartCookie);
	const stripeKey = process.env.STRIPE_API_KEY;

	try {
		const updatedCart = await medusa.carts
			.createPaymentSessions(cart_id)
			.then(async ({ cart }) => {
				// check if stripe is selected
				const isStripeAvailable = cart.payment_sessions?.some(
					(session) => session.provider_id === "stripe",
				);
				if (!isStripeAvailable) {
					return;
				}

				// select stripe payment session
				await medusa.carts.setPaymentSession(cart_id, {
					provider_id: "stripe",
				});

				return cart;
			});
		return json({
			cart: updatedCart,
			clientSecret: updatedCart?.payment_session?.data.client_secret,
			stripeKey,
		});
	} catch (e) {
		throw new Response("Oh No!", {
			status: 404,
		});
	}
}

export default function Payment() {
	const { clientSecret, stripeKey, cart } = useLoaderData();
	const stripePromise = loadStripe(stripeKey);
	return (
		<>
			<h2>Checkout Payment</h2>
			<Elements stripe={stripePromise} options={{ clientSecret }}>
				<StripeForm clientSecret={clientSecret} cart={cart} />
			</Elements>
		</>
	);
}
