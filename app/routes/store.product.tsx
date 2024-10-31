import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const meta: MetaFunction = () => {
	return [
		{ title: "Comforting Keepsakes | Product" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function ProductDisplay() {
	return (
		<>
			<Outlet />
		</>
	);
}
