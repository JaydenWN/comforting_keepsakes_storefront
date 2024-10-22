import Medusa from "@medusajs/medusa-js";

const medusa = new Medusa({
	baseUrl: process.env.MEDUSA_BACKEND_URL,
	maxRetries: 3,
	publishableApiKey: process.env.MEDUSA_API_KEY,
});

// const medusa = new Medusa({
// 	baseUrl: "http://localhost:9000",
// 	maxRetries: 3,
// 	publishableApiKey: "pk_01JACQF785J67D6Q0FFWTENEFF",
// });

export default medusa;
