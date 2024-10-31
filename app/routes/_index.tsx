import type { MetaFunction } from "@remix-run/node";
import LandingHero from "../components/Landing/Landing_Hero";
import HowItWorks from "../components/Landing/How_It_Works";
import Testimonials from "../components/Landing/Testimonials";
import Why from "../components/Landing/Why";
export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function Index() {
	return (
		<main>
			<LandingHero />
			<HowItWorks />
			<Testimonials />
			<Why />
		</main>
	);
}
