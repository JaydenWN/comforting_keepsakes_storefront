import { json, type MetaFunction } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { Form } from "react-aria-components";
import { useState } from "react";
import medusa from "~/utils/medua-client";
import ProductDisplay from "../components/Product/Product_Display";
import ProductSelection from "../components/Product/Product_Selection";
import { Button } from "react-aria-components";
import styles from "../components/Product/product.module.css";
import ProductAddedModal from "../components/Product/Product_Added_Modal";

export const meta: MetaFunction = () => {
	return [
		{ title: "Comforting Keepsakes | Product Name" },
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
	const [customText, setCustomText] = useState(null);
	const [isOpen, setOpen] = useState(false);

	function handleAddToCart(e) {
		setOpen(true);

		e.preventDefault();
		const formData = new FormData();
		formData.set("product_handle", selectedVariant.handle);
		formData.set("variant_id", selectedVariant.id);
		if (customText) {
			formData.set("custom_text", customText);
		}
		fetcher.submit(formData, { method: "POST", action: "/store/cart" });
	}

	function handleVariantSelect(variant) {
		setSelectedVariant(variant);
	}

	return (
		<>
			<ProductAddedModal product={product} isOpen={isOpen} setOpen={setOpen} />
			<section className={`${styles["product"]} gutter-p section-p`}>
				<ProductDisplay
					title={product.title}
					description={product.description}
					imgs={product.images}
					price={selectedVariant.prices[0].amount}
				/>

				<Form
					className={styles["product_form"]}
					method="post"
					validationErrors={fetcher.data?.errors}
					onSubmit={(e) => handleAddToCart(e)}
				>
					{product.variants.length > 1 ? (
						<ProductSelection
							productVariants={product.variants}
							setSelectedVariant={setSelectedVariant}
							selectedVariant={selectedVariant}
							setCustomText={setCustomText}
							customText={customText}
						/>
					) : null}

					<Button type="submit" className={styles["add_to_cart_btn"]}>
						Add to Cart
					</Button>
				</Form>
			</section>
		</>
	);
}
