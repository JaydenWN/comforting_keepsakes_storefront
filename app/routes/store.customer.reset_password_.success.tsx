import { type MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
	return [
		{ title: "Finvision | Forgot Password" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export async function loader({ request }) {
	return null;
}

export default function ForgotPassword() {
	return (
		<>
			<h1>Success</h1>
		</>
	);
}
