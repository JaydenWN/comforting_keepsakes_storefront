import { createCookie, type MetaFunction } from "@remix-run/node";
import LoginForm from "../components/Customer/Login_Form";
import IncorrectDetails from "../components/Customer/Incorrect_Details";
import styles from "../components/Customer/login_form.module.css";
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
import Page_Header from "~/components/Misc/Page_Header";
export const meta: MetaFunction = () => {
	return [
		{ title: "Comforting Keepsakes | Login" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export async function action({ request }) {
	if (request.method === "POST") {
		const formData = await request.formData();
		const { email, password } = Object.fromEntries(formData);
		const session = await getSession(request.headers.get("Cookie"));

		try {
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

				return redirect("/store/customer", {
					headers: {
						...response.headers,
						"Set-Cookie": userSessionCookie,
						cartCookie,
					},
				});
			}

			return redirect("/store/customer", {
				headers: { ...response.headers, "Set-Cookie": userSessionCookie },
			});
		} catch (e) {
			if (e.response.status === 401) {
				return json({ errors: { incorrect_details: true } });
			}
			return null;
		}
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
		<section className="gutter-m">
			<Page_Header title={"Login"} />

			<div className={styles["login_header"]}>
				<p>Login to your keepsake account.</p>
				<p>
					Don't have an account?{" "}
					<NavLink to={"/store/customer/signup"}>Sign Up.</NavLink>
				</p>
			</div>

			{actionData?.errors.incorrect_details && <IncorrectDetails />}

			<Form
				method="post"
				onSubmit={(e) => handleSubmit(e)}
				validationErrors={actionData?.errors}
				className={`${styles["login_form"]}`}
			>
				{actionData?.errors.other === "Unauthorized" && (
					<p>Incorrect Email or Password.</p>
				)}

				<LoginForm />
			</Form>
		</section>
	);
}
