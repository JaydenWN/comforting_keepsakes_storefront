import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData, NavLink, Outlet } from "@remix-run/react";
import medusa from "~/utils/medua-client";

export const meta: MetaFunction = () => {
	return [
		{ title: "Comforting Keepsakes | Subcategory" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export async function loader({ request, params }) {
	const { product_types } = await medusa.productTypes.list({
		q: params.subcategory,
	});

	const { products } = await medusa.products.list({
		type_id: [product_types[0].id],
	});

	return json({ products });
}

export default function Subcategory() {
	const { products } = useLoaderData();

	console.log(products);
	return (
		<>
			<h1>hi</h1>
			<ul>
				{products.map((product) => (
					<li>
						<NavLink to={`/store/product/${product.handle}`}>
							{product.title}
						</NavLink>
					</li>
				))}
			</ul>
		</>
	);
}
