import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
	return [
		{ title: "Finvision | Checkout Confirmation" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function CheckoutConfirmation() {
	return <h2>Checkout Confirmation</h2>;
}
