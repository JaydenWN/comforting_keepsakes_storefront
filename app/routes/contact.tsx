import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
	return [
		{ title: "Comforting Keepsakes | About" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function Contact() {
	return <h2>Contact</h2>;
}
