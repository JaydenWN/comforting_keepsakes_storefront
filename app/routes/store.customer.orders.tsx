import { json, type MetaFunction } from "@remix-run/node";
import { requireUser } from "~/utils/requireUser.server.js";
import medusa from "~/utils/medua-client";
import { NavLink, useLoaderData } from "@remix-run/react";
import { getSession } from "~/utils/createUserSession.server";
import Page_Header from "~/components/Misc/Page_Header";
import OrderSummary from "../components/Orders/order_summary";
import styles from "../components/Orders/orders.module.css";

export const meta: MetaFunction = () => {
	return [
		{ title: "Comforting Keepsakes | Orders" },
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
	return (
		<section className="gutter-m">
			<Page_Header title="Orders" />
			<div className="section-p">
				<div className={styles["orders"]}>
					{loaderData.orders.map((order) => (
						<OrderSummary key={order.id} order={order} />
					))}
				</div>
				<NavLink
					to={"/store/customer/claim_order"}
					className={"primary_button"}
				>
					Claim an Order
				</NavLink>
			</div>
		</section>
	);
}
