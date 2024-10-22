import { createCookie, type MetaFunction } from "@remix-run/node";
import { parse } from "set-cookie-parser";
import {
	json,
	NavLink,
	redirect,
	useActionData,
	useSubmit,
} from "@remix-run/react";
import {
	Form,
	TextField,
	Input,
	Label,
	FieldError,
	Button,
} from "react-aria-components";
import medusa from "~/utils/medua-client";
// import { commitSession, getSession } from "~/utils/userSession.server";
import { cartID } from "~/utils/createCartCookie";
import { commitSession, getSession } from "~/utils/createUserSession.server";
export const meta: MetaFunction = () => {
	return [
		{ title: "Finvision | Login" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export async function action({ request }) {
	if (request.method === "POST") {
		const formData = await request.formData();
		const { email, password } = Object.fromEntries(formData);
		const session = await getSession(request.headers.get("Cookie"));

		const { response, customer } = await medusa.auth.authenticate({
			email,
			password,
		});

		session.set("customer", {
			first_name: customer.first_name,
			last_name: customer.last_name,
			id: customer.id,
			email: customer.email,
		});

		const userSessionCookie = await commitSession(session);

		// if there is a cart, assign the logged in user to the cart.
		const cartCookieHeader = request.headers.get("Cookie");
		const cart_id = await cartID.parse(cartCookieHeader);

		if (cart_id) {
			const { cart } = await medusa.carts.update(cart_id, {
				customer_id: customer.id,
			});
			const cartCookie = await cartID.serialize(cart.id);

			return redirect("/store/customer/orders", {
				headers: {
					...response.headers,
					"Set-Cookie": userSessionCookie,
					cartCookie,
				},
			});
		}

		return redirect("/store/customer/orders", {
			headers: { ...response.headers, "Set-Cookie": userSessionCookie },
		});
	}
}

export default function CustomerLogin() {
	const actionData = useActionData();
	const submit = useSubmit();

	function handleSubmit(e) {
		e.preventDefault();
		submit(e.currentTarget);
	}
	console.log(actionData?.errors);
	return (
		<Form
			method="post"
			onSubmit={(e) => handleSubmit(e)}
			validationErrors={actionData?.errors}
		>
			{actionData?.errors.other === "Unauthorized" && (
				<p>Incorrect Email or Password.</p>
			)}
			<TextField type="email" name="email" isRequired autoComplete="email">
				<Label>Email</Label>
				<Input />
				<FieldError />
			</TextField>

			<TextField type="password" name="password" isRequired>
				<Label>Password</Label>
				<Input />
				<FieldError />
			</TextField>

			<Button type="submit">Login</Button>
			<p>
				No account? <NavLink to={"/store/customer/signup"}>Sign Up.</NavLink>
			</p>
		</Form>
	);
}
