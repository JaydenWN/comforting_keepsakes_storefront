import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { NavLink, useFetcher, useLoaderData } from "@remix-run/react";
import { requireUser } from "~/utils/requireUser.server";
import { getSession } from "~/utils/createUserSession.server";
import medusa from "~/utils/medua-client";
import CustomerDetailsCard from "../components/Customer/Customer_Details_Card";
import Page_Header from "~/components/Misc/Page_Header";
import styles from "../components/Customer/customer.module.css";
export const meta: MetaFunction = () => {
	return [
		{ title: "Comforting Keepsakes | Customer" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export async function action({ request }) {
	const formData = await request.formData();
	const { tel, address_1, address_2, city, state, postal_code } =
		Object.fromEntries(formData);
	const headers = {
		"user-agent": request.headers.get("user-agent"),
		cookie: request.headers.get("cookie"),
		accept: request.headers.get("accept"),
		"accept-language": request.headers.get("accept-language"),
	};

	await medusa.customers.update(
		{
			phone: tel,
			billing_address: {
				address_1,
				address_2,
				city,
				province: state,
				postal_code,
			},
		},
		headers,
	);

	return null;
}

export async function loader({ request }) {
	await requireUser(request);

	const headers = {
		"user-agent": request.headers.get("user-agent"),
		cookie: request.headers.get("cookie"),
		accept: request.headers.get("accept"),
		"accept-language": request.headers.get("accept-language"),
	};

	const { customer } = await medusa.customers.retrieve(headers);

	return json(customer);
}

export default function Customer() {
	const { first_name, phone, email, billing_address } = useLoaderData();
	const fetcher = useFetcher();
	console.log(fetcher.state);
	return (
		<section className="gutter-m">
			<Page_Header title={"Account"} />
			<p className="section-p">Hello, {first_name}.</p>
			<CustomerDetailsCard
				phone={phone}
				email={email}
				billing_address={billing_address}
			/>
			<div className={`${styles["customer_navigation"]} section-p`}>
				<NavLink to={"/store/customer/logout"} className={"primary_button"}>
					Log Out
				</NavLink>
				<NavLink to={"/store/customer/orders"} className={"primary_button"}>
					View Orders
				</NavLink>
			</div>
		</section>
	);
}
