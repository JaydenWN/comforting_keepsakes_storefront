import { json, type MetaFunction } from "@remix-run/node";
import Page_Header from "~/components/Misc/Page_Header";
import medusa from "~/utils/medua-client";
import { requireUser } from "~/utils/requireUser.server.js";
import ClaimOutcome from "../components/Orders/Claim_Outcome";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
	return [
		{ title: "Comforting Keepsakes | Orders" },
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
		return json({
			success: false,
		});
	}

	return json({ success: true });
}

export default function CustomerOrders() {
	const { success } = useLoaderData();
	return (
		<section className="section-p gutter-m">
			<Page_Header title={"Order Claim"} />
			<div className="section-p">
				<ClaimOutcome success={success} />
			</div>
		</section>
	);
}
