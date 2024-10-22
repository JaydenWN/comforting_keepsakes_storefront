import type { MetaFunction } from "@remix-run/node";
import medusa from "~/utils/medua-client";
import { json } from "@remix-run/node";
import { useLoaderData, NavLink } from "@remix-run/react";

export const meta: MetaFunction = () => {
	return [
		{ title: "Finvision | Store" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export async function loader({ request }) {
	const { collections } = await medusa.collections.list();

	return json(collections);
}

export default function Store() {
	const loaderData = useLoaderData();

	return (
		<ul>
			{loaderData.map((collection) => (
				<li key={collection.handle}>
					<NavLink to={`/store/${collection.handle}`}>
						{collection.title}
					</NavLink>
				</li>
			))}
		</ul>
	);
}
