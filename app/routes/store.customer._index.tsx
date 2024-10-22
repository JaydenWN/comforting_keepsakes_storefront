import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import { requireUser } from "~/utils/requireUser.server";
import { getSession } from "~/utils/createUserSession.server";

export const meta: MetaFunction = () => {
	return [
		{ title: "Finvision | Customer" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};
export async function loader({ request }) {
	await requireUser(request);
	const session = await getSession(request.headers.get("Cookie"));
	const customer = session.get("customer");

	return json(customer);
}
export default function Customer() {
	const { first_name } = useLoaderData();

	return (
		<>
			<h2>Customer</h2>
			<p>Hello, {first_name}.</p>
			<NavLink to={"/store/customer/logout"}>Log Out</NavLink>
			<NavLink to={"/store/customer/orders"}>orders</NavLink>
		</>
	);
}
