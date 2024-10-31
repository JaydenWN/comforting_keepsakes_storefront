import { Button, Form } from "react-aria-components";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useFetcher } from "@remix-run/react";
import styles from "./stripe_form.module.css";
export default function StripeForm({ cart, clientSecret }) {
	const stripe = useStripe();
	const elements = useElements();
	const fetcher = useFetcher();

	async function handlePayment(e) {
		e.preventDefault();
		console.log(cart);
		const shippingDetails = cart.shipping_address;
		const { error: submitError } = await elements.submit();

		if (submitError) {
			console.log(submitError);
		}

		await stripe
			?.confirmPayment({
				elements,
				redirect: "if_required",
				clientSecret,
				confirmParams: {
					receipt_email: cart.email,
					payment_method_data: {
						billing_details: {
							name: `${shippingDetails.first_name} ${shippingDetails.last_name}`,
							email: cart.email,
							phone: shippingDetails.phone,
							address: {
								city: shippingDetails.city,
								country: shippingDetails.country_code,
								line1: shippingDetails.address_1,
								line2: shippingDetails.address_2,
								postal_code: shippingDetails.postal_code,
							},
						},
					},
				},
			})
			.then(({ error, paymentIntent }) => {
				if (error) {
					console.log(error);
				}
				if (paymentIntent) {
					fetcher.submit(null, { method: "POST" });
				}
			});
	}

	if (fetcher.state === "submitting" || fetcher.state === "loading") {
		return <h1>loading...</h1>;
	}

	if (fetcher.state === "idle") {
		return (
			<Form
				onSubmit={(e) => handlePayment(e)}
				method="post"
				className={styles["stripe_form"]}
			>
				<PaymentElement />
				<Button type="submit" className="primary_button">
					Confirm Payment
				</Button>
			</Form>
		);
	}
}
