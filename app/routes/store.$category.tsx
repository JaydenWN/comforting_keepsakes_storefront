import type { MetaFunction } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData, useParams } from "@remix-run/react";
import medusa from "~/utils/medua-client";
import { json } from "@remix-run/node";

export const meta: MetaFunction = () => {
	return [
		{ title: "Finvision | Category" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export async function loader({ request, params }) {
	const { product_types } = await medusa.productTypes.list({
		q: params.category,
	});

	return json(product_types);
}

export default function Category() {
	const loaderData = useLoaderData();
	const { category } = useParams();

	return (
		<>
			<h2>Category</h2>
			<ul>
				{loaderData.map((prod_type) => (
					<li key={prod_type.value}>
						<NavLink
							to={`/store/${category}/${prod_type.value.replace(" ", "_").toLowerCase()}`}
						>
							{prod_type.value}
						</NavLink>
					</li>
				))}
			</ul>
		</>
	);
}
