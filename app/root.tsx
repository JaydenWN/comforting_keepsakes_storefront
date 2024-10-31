import {
	Links,
	Meta,
	NavLink,
	Outlet,
	Scripts,
	ScrollRestoration,
	useRouteError,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import "./globals.css";
import Page_Header from "./components/Misc/Page_Header";

export const links: LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
	},
];

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<Navbar />
				{children}
				<ScrollRestoration />
				<Scripts />
				<Footer />
			</body>
		</html>
	);
}
export function ErrorBoundary() {
	const error = useRouteError();
	console.error(error);
	return (
		<html>
			<head>
				<title>Oh no!</title>
				<Meta />
				<Links />
			</head>
			<body>
				<div className={"error section-p gutter-m"}>
					<Page_Header title={"Error"} />
					<p>Whoops! An error has occured.</p>
					<NavLink className="primary_button" to={"/"}>
						Return Home
					</NavLink>
				</div>
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}
