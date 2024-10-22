import { json, type MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const meta: MetaFunction = () => {
	return [
		{ title: "Finvision | Checkout" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};
// Todo:
// Add cart summary + prices etc.
export async function loader({ request }) {
	return null;
}

export default function Checkout() {
	return (
		<>
			<h2>Checkout</h2>

			<Outlet />
		</>
	);
}
