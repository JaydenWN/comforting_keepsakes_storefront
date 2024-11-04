import type { MetaFunction } from "@remix-run/node";
import Page_Header from "~/components/Misc/Page_Header";
import AboutShop from "../components/About/About_Shop";
import MeetTrina from "../components/About/Meet_Trina";
import OurPromise from "../components/About/Our_Promise";
import Why from "../components/Landing/Why";

export const meta: MetaFunction = () => {
	return [
		{ title: "Comforting Keepsakes | About" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function About() {
	return (
		<main>
			<div className="gutter-m">
				<Page_Header title={"About Us"} />
			</div>
			<div className="gutter-m">
				<AboutShop />
			</div>
			<MeetTrina />
			<OurPromise />
			<Why />
		</main>
	);
}
