const CryptoJS = require('crypto-js');

exports.handler = async (event) => {
	try {
		const { amount, productName, userEmail, userId } = JSON.parse(
			event.body,
		);

		const merchantAccount = process.env.WFP_MERCHANT_LOGIN;
		const merchantSecret = process.env.WFP_MERCHANT_SECRET;
		const domain = 'a-teacher.netlify.app';

		const orderReference = `ORDER_${userId}_${Date.now()}`;
		const orderDate = Math.floor(Date.now() / 1000);
		const currency = 'UAH';

		// Данные для подписи должны быть строками или числами в строгом порядке
		const params = [
			merchantAccount,
			domain,
			orderReference,
			orderDate.toString(),
			amount.toString(),
			currency,
			productName,
			'1', // count как строка
			amount.toString(), // price как строка
		];

		const signatureString = params.join(';');
		console.log('Строка для подписи:', signatureString);

		const signature = CryptoJS.HmacMD5(
			signatureString,
			merchantSecret,
		).toString();

		return {
			statusCode: 200,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				merchantAccount,
				merchantDomainName: domain,
				merchantSignature: signature,
				orderReference,
				orderDate,
				amount: Number(amount),
				currency,
				productName: [productName],
				productCount: [1],
				productPrice: [Number(amount)],
				clientEmail: userEmail,
			}),
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ error: error.message }),
		};
	}
};
