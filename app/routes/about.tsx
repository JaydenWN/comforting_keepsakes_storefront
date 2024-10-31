import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
	return [
		{ title: "Comforting Keepsakes | About" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function About() {
	return <h2>About</h2>;
}
