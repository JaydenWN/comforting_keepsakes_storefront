import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
	return [
		{ title: "Finvision | Services" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function Services() {
	return <h2>Services</h2>;
}
