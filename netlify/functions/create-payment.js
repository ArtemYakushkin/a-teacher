// const CryptoJS = require('crypto-js');

// exports.handler = async (event) => {
// 	const { amount, productName, userEmail, userId } = JSON.parse(event.body);
// 	const merchantAccount = process.env.WFP_MERCHANT_LOGIN;
// 	const merchantSecret = process.env.WFP_MERCHANT_SECRET;
// 	const orderReference = `ORDER_${userId}_${Date.now()}`;
// 	const orderDate = Math.floor(Date.now() / 1000);
// 	const domain = 'a-teacher.netlify.app';

// 	const signatureString = [
// 		merchantAccount,
// 		domain,
// 		orderReference,
// 		orderDate,
// 		amount,
// 		'UAH',
// 		productName,
// 		1,
// 		amount,
// 	].join(';');

// 	const signature = CryptoJS.HmacMD5(
// 		signatureString,
// 		merchantSecret,
// 	).toString();

// 	return {
// 		statusCode: 200,
// 		body: JSON.stringify({
// 			merchantAccount,
// 			merchantDomainName: domain,
// 			orderReference,
// 			orderDate,
// 			amount,
// 			currency: 'UAH',
// 			productName,
// 			productCount: [1],
// 			productPrice: [amount],
// 			clientEmail: userEmail,
// 			merchantSignature: signature,
// 		}),
// 	};
// };

// const CryptoJS = require('crypto-js');

// exports.handler = async (event) => {
// 	try {
// 		const { amount, productName, userEmail, userId } = JSON.parse(
// 			event.body,
// 		);

// 		// Достаем ключи
// 		// const merchantAccount = process.env.WFP_MERCHANT_LOGIN;
// 		// const merchantSecret = process.env.WFP_MERCHANT_SECRET;
// 		const merchantAccount = 'test_merch_n1';
// 		const merchantSecret = 'flk3409ref90fd909jf909df90ldk';

// 		// ПРОВЕРКА: Если ключей нет, функция сразу скажет об этом в консоль
// 		if (!merchantAccount || !merchantSecret) {
// 			console.error('ОШИБКА: Переменные окружения WFP не найдены!');
// 			return {
// 				statusCode: 500,
// 				body: JSON.stringify({
// 					error: 'Server keys are missing. Check Netlify env variables.',
// 				}),
// 			};
// 		}

// 		const orderReference = `ORDER_${userId}_${Date.now()}`;
// 		const orderDate = Math.floor(Date.now() / 1000);
// 		// const domain = 'a-teacher.netlify.app';
// 		const domain = 'www.market.ua';

// 		// Склеиваем строку
// 		const signatureString = [
// 			merchantAccount,
// 			domain,
// 			orderReference,
// 			orderDate,
// 			amount,
// 			'UAH',
// 			productName,
// 			1,
// 			amount,
// 		].join(';');

// 		// Теперь HMAC не упадет, так как мы проверили merchantSecret выше
// 		const signature = CryptoJS.HmacMD5(
// 			signatureString,
// 			merchantSecret,
// 		).toString();

// 		return {
// 			statusCode: 200,
// 			headers: { 'Content-Type': 'application/json' },
// 			body: JSON.stringify({
// 				merchantAccount,
// 				merchantDomainName: domain,
// 				orderReference,
// 				orderDate,
// 				amount,
// 				currency: 'UAH',
// 				productName,
// 				productCount: [1],
// 				productPrice: [amount],
// 				clientEmail: userEmail,
// 				merchantSignature: signature,
// 			}),
// 		};
// 	} catch (error) {
// 		console.error('Критическая ошибка функции:', error);
// 		return {
// 			statusCode: 500,
// 			body: JSON.stringify({ error: error.message }),
// 		};
// 	}
// };

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
