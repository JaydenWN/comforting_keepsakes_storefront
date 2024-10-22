import { redirect } from "@remix-run/node";
import medusa from "./medua-client";

export async function requireUser(request) {
	// Returns a customer object if authenticated, else throws a redirect to login page
	const headers = {
		"user-agent": request.headers.get("user-agent"),
		cookie: request.headers.get("cookie"),
		accept: request.headers.get("accept"),
		"accept-language": request.headers.get("accept-language"),
	};

	await medusa.auth.getSession(headers).then(
		(res) => {
			return res.customer;
		},
		(e) => {
			if (e.response.status === 401) {
				throw redirect("/store/customer/login");
			}
			throw Error("Customer Authentication Error", { status: 404 });
		},
	);
}
