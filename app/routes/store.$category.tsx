import type { MetaFunction } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData, useParams } from "@remix-run/react";
import medusa from "~/utils/medua-client";
import { json } from "@remix-run/node";
import Page_Header from "~/components/Misc/Page_Header";
import CategoryDisplay from "../components/Products/Category_Display";

export const meta: MetaFunction = () => {
	return [
		{ title: "Comforting Keepsakes | Category" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export async function loader({ request, params }) {
	const { products } = await medusa.products.list({
		q: params.category.replaceAll("-", " "),
	});
	console.log(products);
	return json({ products });
}

export default function Category() {
	const { products } = useLoaderData();
	const { category } = useParams();
	console.log(products);
	return (
		<section className="gutter-m">
			<Page_Header title={"Store"} />
			<div className="section-p">
				<CategoryDisplay
					products={products}
					title={category.replaceAll("-", " ")}
				/>
			</div>
		</section>
	);
}
