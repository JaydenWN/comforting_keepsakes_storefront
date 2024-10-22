import { createCookieSessionStorage } from "@remix-run/node";

const sessionSecret = process.env.SESSION_SECRET;

export const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: "user",
		secure: process.env.NODE_ENV === "production",
		secrets: [sessionSecret],
		sameSite: "lax",
		path: "/",
		httpOnly: true,
	},
});

export const { getSession, commitSession, destroySession } = sessionStorage;