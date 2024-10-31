import type { MetaFunction } from "@remix-run/node";
import OrderConfirmation from "../components/Checkout/Order_Confirmation";
import WhatNow from "../components/Checkout/What_Now";

export const meta: MetaFunction = () => {
	return [
		{ title: "Comforting Keepsakes | Checkout Confirmation" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function CheckoutConfirmation() {
	return (
		<section className="section-p">
			<OrderConfirmation />
			<WhatNow />
		</section>
	);
}
