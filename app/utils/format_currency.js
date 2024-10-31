export default function fortmatCurrency(price) {
	const formattedPrice = (price / 100).toLocaleString("en-AU", {
		style: "currency",
		currency: "AUD",
	});

	return formattedPrice;
}
