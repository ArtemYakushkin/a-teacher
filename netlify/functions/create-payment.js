const CryptoJS = require('crypto-js');

exports.handler = async (event) => {
	const { amount, productName, userEmail, userId } = JSON.parse(event.body);
	const merchantAccount = process.env.WFP_MERCHANT_LOGIN;
	const merchantSecret = process.env.WFP_MERCHANT_SECRET;
	const orderReference = `ORDER_${userId}_${Date.now()}`;
	const orderDate = Math.floor(Date.now() / 1000);
	const domain = 'a-teacher.netlify.app';

	const signatureString = [
		merchantAccount,
		domain,
		orderReference,
		orderDate,
		amount,
		'UAH',
		productName,
		1,
		amount,
	].join(';');

	const signature = CryptoJS.HmacMD5(
		signatureString,
		merchantSecret,
	).toString();

	return {
		statusCode: 200,
		body: JSON.stringify({
			merchantAccount,
			merchantDomainName: domain,
			orderReference,
			orderDate,
			amount,
			currency: 'UAH',
			productName,
			productCount: [1],
			productPrice: [amount],
			clientEmail: userEmail,
			merchantSignature: signature,
		}),
	};
};
