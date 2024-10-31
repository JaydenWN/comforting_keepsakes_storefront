import { redirect, type MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { requireUser } from "~/utils/requireUser.server";
import medusa from "~/utils/medua-client";
import {
	commitSession,
	destroySession,
	getSession,
} from "~/utils/createUserSession.server";
import Page_Header from "~/components/Misc/Page_Header";

export const meta: MetaFunction = () => {
	return [
		{ title: "Comforting Keepsakes | Logout" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export async function loader({ request }) {
	await requireUser(request);
	const headers = {
		"user-agent": request.headers.get("user-agent"),
		cookie: request.headers.get("cookie"),
		accept: request.headers.get("accept"),
		"accept-language": request.headers.get("accept-language"),
	};
	const session = await destroySession(request.headers.get("Cookie"));
	const userSessionCookie = await commitSession(session);
	await medusa.auth.deleteSession(headers);
	// return json(null, {
	// 	headers: {
	// 		"Set-Cookie": userSessionCookie,
	// 	},
	// });
	return redirect("/", { headers: { "Set-Cookie": userSessionCookie } });
}
