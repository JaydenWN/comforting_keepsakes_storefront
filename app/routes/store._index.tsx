import type { MetaFunction } from "@remix-run/node";
import medusa from "~/utils/medua-client";
import { json } from "@remix-run/node";
import { useLoaderData, NavLink } from "@remix-run/react";
import PageHeader from "../components/Misc/Page_Header";
import CollectionDisplay from "../components/Products/Collection_Display";
import styles from "../components/Products/store_index.module.css";
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
		<main className="gutter-m ">
			<header>
				<PageHeader title={"Store"} />
			</header>
			<div className={styles["product_collections"]}>
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
