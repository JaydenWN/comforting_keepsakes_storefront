import { json, type MetaFunction } from "@remix-run/node";
import { requireUser } from "~/utils/requireUser.server.js";
import medusa from "~/utils/medua-client";
import { useActionData, useFetcher, useLoaderData } from "@remix-run/react";
import Page_Header from "~/components/Misc/Page_Header";
import OrderClaim from "../components/Orders/Order_Claim";
import styles from "../components/Orders/claim_order.module.css";

export const meta: MetaFunction = () => {
	return [
		{ title: "Comforting Keepsakes | Orders" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export async function action({ request }) {
	const formData = await request.formData();
	const { order_id } = Object.fromEntries(formData);
	const headers = {
		"user-agent": request.headers.get("user-agent"),
		cookie: request.headers.get("cookie"),
		accept: request.headers.get("accept"),
		"accept-language": request.headers.get("accept-language"),
	};
	if (!order_id) {
		return json({
			errors: { order_id: "Please provide a order identification number." },
		});
	}

	try {
		await medusa.orders.retrieve(order_id);

		await medusa.orders.requestCustomerOrders(
			{ order_ids: [order_id] },
			headers,
		);

		await medusa.orders.requestCustomerOrders(
			{ order_ids: [order_id] },
			headers,
		);

		return json({
			errors: {
				confirmation: "Please follow instructions sent to your email.",
			},
		});
	} catch (e) {
		return json({
			errors: {
				order_id: "Could'nt find an order with that identification number.",
			},
		});
	}
}

export async function loader({ request }) {
	await requireUser(request);

	return null;
}

export default function CustomerOrders() {
	const loaderData = useLoaderData();
	const actionData = useActionData();
	const fetcher = useFetcher();

	function handleSubmit(e) {
		e.preventDefault();
		fetcher.submit(e.currentTarget, {
			method: "post",
		});
	}

	return (
		<section className="gutter-m">
			<Page_Header title={"Order Claim"} />
			<div className={`${styles["order_claim"]} section-p `}>
				<div className={styles["info_text"]}>
					<p>Wish to claim an order and add it to your account?</p>
					<p>
						Please enter your order ID that you recieved in the confirmation
						email we sent when you placed your order.
					</p>
				</div>
				<OrderClaim handleSubmit={handleSubmit} fetcher={fetcher} />
			</div>
		</section>
	);
}
