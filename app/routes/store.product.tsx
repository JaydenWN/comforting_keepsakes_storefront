import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const meta: MetaFunction = () => {
	return [
		{ title: "Finvision | Product" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function ProductDisplay() {
	return (
		<>
			<h2>Product Display</h2>
			<Outlet />
		</>
	);
}
