import { json, type MetaFunction } from "@remix-run/node";
import { requireUser } from "~/utils/requireUser.server.js";
import medusa from "~/utils/medua-client";
import { useLoaderData } from "@remix-run/react";
import { getSession } from "~/utils/createUserSession.server";

export const meta: MetaFunction = () => {
	return [
		{ title: "Finvision | Orders" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export async function loader({ request }) {
	const customer = await requireUser(request);
	const headers = {
		"user-agent": request.headers.get("user-agent"),
		cookie: request.headers.get("cookie"),
		accept: request.headers.get("accept"),
		"accept-language": request.headers.get("accept-language"),
	};
	const { orders, limit, offset, count } = await medusa.customers.listOrders(
		null,
		headers,
	);

	return json({ orders, limit, offset, count });
}

export default function CustomerOrders() {
	const loaderData = useLoaderData();
	console.log(loaderData);
	return (
		<>
			<h2>Orders</h2>
		</>
	);
}
