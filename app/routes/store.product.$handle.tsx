import { json, type MetaFunction } from "@remix-run/node";
import { useFetcher, useLoaderData, Form } from "@remix-run/react";
import { useState } from "react";
import medusa from "~/utils/medua-client";
import createCart from "~/utils/createCart";
import { cartID } from "~/utils/createCartCookie";

export const meta: MetaFunction = () => {
	return [
		{ title: "Finvision | Product Name" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export async function loader({ request, params }) {
	// Search medusa products using handle.
	const { handle } = params;
	const { products } = await medusa.products.list({
		handle: handle,
	});

	//Throw 404 if product not found.
	if (products.length === 0) {
		throw new Response(null, {
			status: 404,
			statusText: "No product found.",
		});
	}

	return json(products[0]);
}

export default function Product() {
	const product = useLoaderData();
	const fetcher = useFetcher();

	const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

	function handleAddToCart() {
		const formData = new FormData();
		formData.set("product_handle", selectedVariant.handle);
		formData.set("variant_id", selectedVariant.id);
		fetcher.submit(formData, { method: "POST", action: "/store/cart" });
	}

	function handleVariantSelect(variant) {
		setSelectedVariant(variant);
	}

	return (
		<>
			<h2>{product.title}</h2>
			<p>{product.description}</p>
			<img src={product.images[0].url} style={{ width: 200 }} />

			<Form>
				{product.variants.length > 1
					? product.variants.map((variant) => (
							<div key={variant.title}>
								<input
									type="radio"
									value={variant.title}
									name="variant"
									id={variant.title}
									onChange={() => handleVariantSelect(variant)}
								/>
								<label htmlFor={variant.title}>{variant.title}</label>
							</div>
						))
					: null}
				<button onClick={handleAddToCart}>Add to cart</button>
			</Form>
		</>
	);
}
