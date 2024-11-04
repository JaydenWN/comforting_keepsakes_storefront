import type { MetaFunction } from "@remix-run/node";
import Page_Header from "~/components/Misc/Page_Header";
import ContactKeepsakes from "../components/Contact/Contact_Keepsakes";
import OurInformation from "../components/Contact/Our_Information";
import Why from "~/components/Landing/Why";

export const meta: MetaFunction = () => {
	return [
		{ title: "Comforting Keepsakes | About" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function Contact() {
	return (
		<main>
			<div className="gutter-m">
				<Page_Header title={"Contact"} />
			</div>
			<ContactKeepsakes />
			<OurInformation />
			<Why />
		</main>
	);
}
