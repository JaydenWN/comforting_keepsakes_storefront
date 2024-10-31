import type { MetaFunction } from "@remix-run/node";
import medusa from "~/utils/medua-client";
import { json } from "@remix-run/node";
import { useLoaderData, NavLink } from "@remix-run/react";
import PageHeader from "../components/Misc/Page_Header";
import CollectionDisplay from "../components/Products/Collection_Display";

export const meta: MetaFunction = () => {
	return [
		{ title: "Comforting Keepsakes | Store" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export async function loader({ request }) {
	const { collections } = await medusa.collections.list();
	const { products } = await medusa.products.list();

	return json({ collections, products });
}

export default function Store() {
	const { collections, products } = useLoaderData();
	return (
		<main className="gutter-p ">
			<header>
				<PageHeader title={"Store"} />
			</header>
			<div className="section-p">
				{collections.map((collection) => (
					<CollectionDisplay
						collection={collection}
						key={collection.handle}
						products={products.filter(
							(product) => product.collection_id === collection.id,
						)}
					/>
				))}
			</div>
		</main>
	);
}
