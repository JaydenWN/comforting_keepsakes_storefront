import { json, type MetaFunction } from "@remix-run/node";
import medusa from "~/utils/medua-client";
import { requireUser } from "~/utils/requireUser.server.js";

export const meta: MetaFunction = () => {
	return [
		{ title: "Finvision | Orders" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export async function loader({ request, params }) {
	const { token } = params;

	await requireUser(request);
	const headers = {
		"user-agent": request.headers.get("user-agent"),
		cookie: request.headers.get("cookie"),
		accept: request.headers.get("accept"),
		"accept-language": request.headers.get("accept-language"),
	};

	try {
		await medusa.orders.confirmRequest(
			{
				token,
			},
			headers,
		);
	} catch (e) {
		console.log(e);
	}

	return null;
}

export default function CustomerOrders() {
	return (
		<>
			<h2>Confirmation</h2>
		</>
	);
}
