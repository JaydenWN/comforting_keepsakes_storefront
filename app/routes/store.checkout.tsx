import { json, type MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import Page_Header from "~/components/Misc/Page_Header";

export const meta: MetaFunction = () => {
	return [
		{ title: "Comforting Keepsakes | Checkout" },
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
		<section className="gutter-p section-p">
			<Page_Header title={"Checkout"} />

			<Outlet />
		</section>
	);
}
